const request = require('request');
const cheerio = require('cheerio');
const walk = require('./walk.js');

let _69shu = {};

/**
 * 保存小说到数据库
 * only useful in www.69shu.com
 * resolve: object array,  type: Array
 * reject: error,          type: Error
 * @param {string} url
 */
function saveNovel(url) {

  let promise = new Promise(function (resolve, reject) {
    walk.getbody(url, true)
      .then(function (result) {
        let $ = cheerio.load(result);

        let ul = $('#content > div.bookstoretwo > div > div.right_main > div > ul');

        let li = $('li', ul);

        let bodyList = [];

        for (let i = 1; i < li.length; i++) {
          let title = $('.sp_2 a', li[i]).text();
          let url = 'http://www.69shu.com' + $('.sp_2 a', li[i]).attr('href');
          let author = $('.sp_3 a', li[i]).text();

          let op = {
            url: 'http://127.0.0.1:8008/novel',
            method: 'PUT',
            header: {
            },
            form: {
              title: title,
              author: author,
              link: url
            }
          }

          request(op, function (err, response, body) {
            if (err) reject(err);
            else if (response.statusCode != 200) {
              reject(new Error(`
              httpCode: ${response.statusCode},
              body: ${body}
              `))
            } else {
              bodyList.push({
                index: i,
                msg: 'ok',
                response: response,
                body: JSON.parse(body)
              });
              // 注意点回调, 真是坑, 如果写到for循环外就什么都得不到了
              if (i == li.length - 1) {
                resolve(bodyList);
              }
            }
          })
        }

      }, function (reason) {
        reject(reason)
      });
  });

  return promise;

}

/**
 * 保存章节到数据库
 * only useful in www.69shu.com
 * resolve: 'ok',      type: String,
 * reject: error,      type: Error
 * @param {string} url
 * @param {number} index
 * @param {string} novelid
 */
function saveChapter(url, index, novelid) {

  let promise = new Promise(function (resolve, reject) {
    walk.getbody(url, true)
      .then(function (result) {
        let $ = cheerio.load(result);
        $('script').remove();

        let title = $('body > div.warpper > table > tbody > tr > td > h1').text();
        title = title.trim();

        let body = $('body > div.warpper > table > tbody > tr > td > div.yd_text2').text();
        body = body.replace(/(\s)+/ig, '\r\n').trim();

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
          if (err) reject(err);
          else if (response.statusCode != 200) {
            reject(new Error(`
              httpCode: ${response.statusCode},
              body: ${body}
              `))
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

/**
 * 获得小说的介绍页面的链接, 从数据库中
 */
function getNovelLink(id) {
  let promise = new Promise(function (resolve, reject) {
    let link = 'http://127.0.0.1:8008/novel/' + id;

    request.get(link, function (err, response, body) {
      if (err) reject(err);
      else if (response.statusCode != 200) {
        reject(new Error(`
              httpCode: ${response.statusCode},
              body: ${body}
              `))
      } else {
        resolve(JSON.parse(body).link);
      }
    })
  });

  return promise;
}

/**
 * 获得小说章节的链接数组, 类型为标题和链接
 */
function getChapterList(url) {
  let promise = new Promise(function (resolve, reject) {
    walk.getbody(url, true)
      .then(function (result) {
        let $ = cheerio.load(result);
        let ul = $('body > div.warpper > div:nth-child(5) > ul:nth-child(2)');
        let li = $('li', ul);

        let list = [];

        for (let i = 0; i < li.length; i++) {
          let title = $('a', li[i]).text();
          let url = 'http://www.69shu.com' + $('a', li[i]).attr('href');
          list.push({
            title: title,
            url: url
          })
        }

        resolve(list);
      }, function (reason) {
        reject(reason);
      })
  });

  return promise;
}


_69shu.saveNovel = saveNovel;
_69shu.saveChapter = saveChapter;
_69shu.getNovelLink = getNovelLink;
_69shu.getChapterList = getChapterList;
module.exports = _69shu;
