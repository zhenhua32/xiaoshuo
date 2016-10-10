const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');

let walk = {};

walk.chrome = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';

walk.options = {
  headers: {
    'User-Agent': walk.chrome
  }
}

/**
 * resolve: html body, type: String
 * reject: error,      type: Error
 * @param {string} url - The link start with http|https
 * @param {boolean} isgbk - The html page is gbk? true: false
 * @retrun {Promise}
 */
function getbody(url, isgbk) {
  let body = '';
  walk.options.url = url;

  let promise = new Promise(function (resolve, reject) {
    let stream = request.get(walk.options);

    stream.on('error', function (err) {
      reject(err);
    });

    if (isgbk) {
      stream
        .pipe(iconv.decodeStream('gbk'))
        .pipe(iconv.decodeStream('utf8'))
        .on('data', function (chunk) {
          body += chunk;
        })
        .on('finish', function () {
          resolve(body);
        })
    } else {
      stream
        .on('data', function (chunk) {
          body += chunk;
        })
        .on('finish', function () {
          resolve(body);
        })
    }


  });

  return promise;

}


/**
 * general vesion for saveChapter
 * @param {function} get - ($) => {title, body}
 * @return {Promise}
 */
function saveChapterGeneral(url, index, novelid, get) {

  let promise = new Promise(function (resolve, reject) {
    walk.getbody(url, true)
      .then(function (result) {
        let $ = cheerio.load(result);
        $('script').remove();

        let info = get($);
        let title = info.title;
        let body = info.body;

        let op = {
          url: 'http://127.0.0.1:8008/chapter',
          method: 'PUT',
          header: {
          },
          form: {
            index: index,
            title: title,
            body: body,
            novel: novelid
          }
        }

        request(op, function (err, response, body) {
          if (err) {
            reject(err);
          }
          if (response.statusCode != 200) {
            reject(new Error(response.statusCode));
          } else {
            resolve('ok');
          }
        })


      }, function (reason) {
        reject(reason);
      });
  });

  return promise;
}


walk.getbody = getbody;

module.exports = walk;



