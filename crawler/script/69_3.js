const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let list = JSON.parse(
  fs.readFileSync('./info/69_2.json', {
    encoding: 'utf8'
  })
);

let links = [];
let ids = [];

for(let i=0; i<list.length; i++) {
  links.push(list[i].chapterList);
  ids.push(list[i].id);
}

let array = [];

let master = [];
master[0] = _69shu.getChapterList(links[0]);
for (let i = 1; i < links.length + 1; i++) {
  master[i] = master[i - 1].then(function (result) {
    array.push({
      id: ids[i-1],
      list: result
    })

    if (i < links.length) {
      process.stdout.write(i / links.length + '\033[0G');
      return _69shu.getChapterList(links[i]);
    } else {
      process.stdout.write('\n' + i / links.length);
      fs.writeFileSync('./info/69_3.json', JSON.stringify({
        array: array
      }))
    }
  }, function (reason) {
    console.log(reason);
    array.push({
      id: ids[i],
      list: [],
      link: links[i]
    })
  })
}




