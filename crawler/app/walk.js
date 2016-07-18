const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');

let walk = {};

walk.chrome = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';

walk.options = {
    headers: {
        'User-Agent': walk.chrome
    }
}

function getbody(url, isgbk) {
    let body = '';
    walk.options.url = url;

    let promise = new Promise(function (resolve, reject) {
        let stream = request.get(walk.options);

        stream.on('error', function (err) {
            reject(err);
        });

        if (isgbk) {
            stream
                .pipe(iconv.decodeStream('gbk'))
                .pipe(iconv.decodeStream('utf8'))
                .on('data', function (chunk) {
                    body += chunk;
                })
                .on('finish', function () {
                    resolve(body);
                })
        } else {
            stream
                .on('data', function (chunk) {
                    body += chunk;
                })
                .on('finish', function () {
                    resolve(body);
                })
        }


    });

    return promise;

}

walk.getbody = getbody;

module.exports = walk;



