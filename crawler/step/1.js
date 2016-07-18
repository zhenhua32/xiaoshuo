const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');

/**
 * 获取书库目录中的第一页的小说, 并存入
 * 这是一个测试
 */
let shuku = 'http://www.69shu.com/shuku/';

walk.getbody(shuku, true)
  .then(function (result) {
    let $ = cheerio.load(result);

    let ul = $('#content > div.bookstoretwo > div > div.right_main > div > ul');

    let li = $('li', ul);

    for(let i=1; i<li.length; i++) {
      let title = $('.sp_2 a', li[i]).text();
      let url = 'http://www.69shu.com'+$('.sp_2 a', li[i]).attr('href');
      let author = $('.sp_3 a', li[i]).text();
      // console.log(`${title} ${url} ${author}`);

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

      request(op, function(err, response ,body) {
        if(err) console.log(err);
        if(response.statusCode!=200) {
          console.log(response.statusCode)
        }
      })
    }

  }, function (reason) {
    console.log(reason);
  })
