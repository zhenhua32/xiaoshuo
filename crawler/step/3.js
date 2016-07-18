const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');

let url = 'http://www.69shu.com/txt/8894/5831176'

  walk.getbody(url, true)
    .then(function (result) {
      let $ = cheerio.load(result);

      $('script').remove();

      let title = $('body > div.warpper > table > tbody > tr > td > h1').text();

      let body = $('body > div.warpper > table > tbody > tr > td > div.yd_text2').text();

      console.log(body.replace(/(\s)+/ig, '\r\n+').trim());

      console.log(title)


    }, function (reason) {
      console.log(reason);
    })
