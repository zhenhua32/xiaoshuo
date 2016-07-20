const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let link = 'http://www.69shu.com/weekvisit_0_0_0_0_0_0_1.htm';

_69shu.saveNovel(link)
.then(function(result) {
  let ids = [];
  for(let i=0; i<result.length;i++) {
    ids.push(result[i].body.id);
  }
  fs.writeFileSync('./info/69_1.txt', ids.join('\r\n'), {encoding: 'utf8'});
  fs.writeFileSync('./info/69_1.json', JSON.stringify({
    ids: ids
  }), {encoding: 'utf8'});

  console.log('step1 done')
}, function(reason) {
  console.log(reason)
});

