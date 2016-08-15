const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let op = {
  url: 'http://127.0.0.1:8008/novel',
  method: 'PUT',
  header: {
  },
  form: {
    title: '8000章测试',
    author: 'hello',
    link: 'http://www.69shu.com/txt/10368.htm'
  }
}

function getNovel(resolve, reject) {
  request(op, function (err, response, body) {
    if (err) reject(err);
    else if (response.statusCode != 200) {
      reject(new Error(`
              httpCode: ${response.statusCode},
              body: ${body}
              `))
    } else {
      resolve(body);
    }
  })
}

let getnovel = new Promise(getNovel);
let listUrl = 'http://www.69shu.com/10368/';


Promise
  .all([getnovel, _69shu.getChapterList(listUrl)])
  .then(function (result) {
    let id = JSON.parse(result[0]).id;
    let list = result[1];
    console.log(id)

    let index = 0;
    function recursion() {
      if (index < list.length) {
        setTimeout(function () {
          // index 从1开始
          _69shu.saveChapter(list[index].url, index + 1, id)
          .catch(function(reason){
            console.log(reason)
          });
          index++;

          process.stdout.write(index / list.length + ' \033[0G');

          recursion();
        }, 1000);
      } else {
        console.log('done');
      }
    }

    recursion();
  })








