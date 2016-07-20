const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');

/**
 * 存入小说的章节
 * 这是一个测试
 */

let novel = 'http://www.69shu.com/txt/8894.htm';
let id = '578d800efe54bea03079357a';

let get = new Promise(function (resolve, reject) {
  walk.getbody(novel, true)
    .then(function (result) {
      let $ = cheerio.load(result);

      let link = 'http://www.69shu.com' + $('a.button.read').attr('href');

      walk.getbody(link, true)
        .then(function (body) {
          resolve(body)
        }, function (reason) {
          console.log(reason);
          reject(reason);
        })

    }, function (reason) {
      console.log(reason);
      reject(reason);
    })
});

get.then(function (result) {
  let $ = cheerio.load(result);
  let ul = $('body > div.warpper > div:nth-child(5) > ul:nth-child(2)');
  let li = $('li', ul);

  let array = [];

  for (let i = 0; i < li.length; i++) {
    let title = $('a', li[i]).text();
    let url = 'http://www.69shu.com' + $('a', li[i]).attr('href');
    array.push({
      title: title,
      url: url
    })
  }

  let index = 0;

  function recursion() {
    if (index < array.length) {
      setTimeout(function () {
        // index 从1开始
        saveChapter(array[index].url, index + 1, id);
        index++;
        recursion();
      }, 1000);
    } else {
      console.log('done')
    }
  }

  recursion();



}, function (reason) {
  console.log(reason);
})

function saveChapter(url, index, novelid) {
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
        if (err) console.log(err);
        if (response.statusCode != 200) {
          console.log(response.statusCode);
          console.log(index + 'failed');
        }
      })


    }, function (reason) {
      console.log(reason);
    })
}

