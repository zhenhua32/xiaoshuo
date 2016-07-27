const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let array = JSON.parse(
  fs.readFileSync('./info/69_1.json', {
    encoding: 'utf8'
  })
);

for (let i = 0; i < array.length; i++) {
  array[i].chapterList = array[i].intro.slice(0, -4).replace('txt/', '') + '/';
}

fs.writeFileSync('./info/69_2.json', JSON.stringify(array), { encoding: 'utf8' });


