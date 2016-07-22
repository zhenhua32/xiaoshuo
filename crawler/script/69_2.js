const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let ids = JSON.parse(
  fs.readFileSync('./info/69_1.json', {
    encoding: 'utf8'
  })
).ids;

let links = [];
for (let i = 0; i < ids.length; i++) {
  _69shu.getNovelLink(ids[i])
    .then(function (result) {
      links.push(result);

      if (i == ids.length - 1) {
        callback(links);
      }
    }, function (reason) {
      console.log(reason);
    })
}

// 如果链接有模式可循, 就可以避免去网页上爬取
// 链接有两种, 一种是小说介绍页面, 另一种是小说的章节列表页面
function callback(links) {
  let intro = links;
  let chapterList = [];
  for (let i = 0; i < intro.length; i++) {
    chapterList.push(intro[i].slice(0, -4).replace('txt/', '')+'/');
  }

  fs.writeFileSync('./info/69_2.txt', chapterList.join('\r\n'), { encoding: 'utf8' });
  fs.writeFileSync('./info/69_2.json', JSON.stringify({
    intro: intro,
    chapterList: chapterList
  }), { encoding: 'utf8' });
}

