const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let links = JSON.parse(
  fs.readFileSync('./info/69_2.json', {
    encoding: 'utf8'
  })
).chapterList;

let ids = JSON.parse(
  fs.readFileSync('./info/69_1.json', {
    encoding: 'utf8'
  })
).ids;

function getChapterList(url, id) {
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

        resolve(array);
      }, function (reason) {
        reject(reason);
      })
  });

  return promise;
}

let array = [];

for (let i = 0; i < links.length; i++) {
  getChapterList(links[i], ids[i])
    .then(function (result) {
      array.push({
        id: ids[i],
        list: result
      });

      if( i == links.length -1) {
        for(let j=0; j<array.length; j++) {
          console.log(array[j].list)
        }
      }

    }, function(reason) {
      console.log('    '+reason);
    })
}

