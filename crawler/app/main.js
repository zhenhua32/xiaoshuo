const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');

let chrome = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';

let options = {
    headers: {
        'User-Agent': chrome
    }
}

let start = 'http://www.69shu.com/shuku/';

function getStart(options) {
    let op = options;
    op.url = start;

    // request(op, function(err, res, body) {
    //     if(!err && res.statusCode == 200) {
    //         let $ = cheerio.load(body);
    //         let a = $('body > div.warpper > div.top > div.top_l > a').text();
    //         console.log(a)
    //     }
    // })

    // let s = fs.createWriteStream('file.html');
    let body = '';
    request.get(op)
        .on('error', function (err) {
            console.log(err);
        })
        .pipe(iconv.decodeStream('gbk'))
        .pipe(iconv.encodeStream('utf8'))
        .on('data', function (chunk) {
            body += chunk;
        })
        .on('finish', function () {
            let $ = cheerio.load(body);
            let a = $('body > div.warpper > div.top > div.top_l > a').text();
            console.log(a)
        })


    // fs.createReadStream('file.html', 'utf8')
    // .on('data', function(a) {
    //     console.log(a)
    // })
}

getStart(options);



