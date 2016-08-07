const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

/**
 * create links form novel-list page
 */

let link = 'http://www.69shu.com/weekvisit_0_0_0_0_0_0_1.htm';

_69shu.saveNovel(link)
  .then(function (result) {
    let ids = [];
    for (let i = 0; i < result.length; i++) {
      ids.push({
        id: result[i].body.id,
        intro: result[i].link
      });
    }

    fs.writeFileSync('./info/69_1.json', JSON.stringify(
      ids
    ), { encoding: 'utf8' });

  }, function (reason) {
    console.log(reason)
  });

