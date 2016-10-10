const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');

let array = JSON.parse(
  fs.readFileSync('./info/69_3.json', {
    encoding: 'utf8'
  })
).array;

function save(novel, next) {
  let index = 0;
  function recursion() {
    if (index < novel.list.length) {
      setTimeout(function () {
        // index 从1开始
        _69shu.saveChapter(novel.list[index].url, index + 1, novel.id)
          .catch(function (reason) {
            console.log(reason);
          });
        index++;

        // process.stdout.write(index / novel.list.length + ' \033[0G');

        recursion();
      }, 1000);
    } else {
      next();
    }
  }

  recursion();
}

let count = 0;
function next() {
  console.log('start next')
  if (count < array.length - 1) {
    count++;
    save(array[count], next);
  } else {
    console.log('done');
  }
}
save(array[0], next);



