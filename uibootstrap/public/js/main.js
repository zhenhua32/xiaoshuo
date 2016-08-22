// config
var baseNovel = '';
var baseChapter = '';

// var $ = require('jquery');
$(document).ready(function () {
  if (window.location.hostname == 'localhost') {
    baseNovel = 'http://localhost:8008/novel';
    baseChapter = 'http://localhost:8008/chapter';
  } else {
    baseNovel = '/api/novel';
    baseChapter = '/api/chapter';
  }
  // add novel list
  switch (window.location.pathname) {
    case '/':
      loadNovel();
      break;
    case '/novel.html':
      loadProcess();
      loadChapter();
      break;
    case '/chapter.html':
      loadContent();
      break;
    default:
      loadNovel();
      break;
  }
})

function loadNovel() {
  $.ajax({
    url: baseNovel + '/all',
    dataType: 'json',
    method: 'GET',
    crossDomain: true
  })
    .then(function (data, textStatus, jqXHR) {
      data.map(function (node) {
        $('#novellist').append(
          '<a href="/novel.html?id=' + node._id + '" class="list-group-item">' + node.title + '</a>'
        )
      })
    }, function (jqXHR, textStatus, err) {
      console.log(jqXHR.responseJSON.msg);
      console.log(textStatus);
      console.log(err);
    })
}

function loadChapter() {
  var search = window.location.search;
  var id = search.slice(4);

  $.get(baseNovel + '/id/' + id)
    .then(function (data) {
      $('#novel').text(data.title);
    })

  $.ajax({
    url: baseChapter + '/all?limit=9999&skip=0&novelid=' + id,
    dataType: 'json',
    method: 'GET',
    crossDomain: true
  })
    .then(function (data, textStatus, jqXHR) {

      data.map(function (node) {
        $('#chapterlist').append(
          '<a href="/chapter.html?novelid=' +
          id + '&index=' + node.index +
          '" class="list-group-item">' +
          node.title +
          '</a>'
        );
      });

      $('.progress-bar').attr('aria-valuenow', '99').text(99).attr('style', 'width: 99%');
      $('.progress').fadeOut(3000);

    }, function (jqXHR, textStatus, err) {
      console.log(jqXHR.responseJSON.msg);
      console.log(textStatus);
      console.log(err);
    })

}

function loadContent() {
  var query = parseQuery(window.location.search);

  var base = '/chapter.html?novelid=' + query.novelid + '&index=';

  if (query.index == 1) {
    $('.pager .previous').addClass('disabled');
  } else {
    $('.pager .previous a').attr('href', base + (Number(query.index) - 1))
  }

  $('.pager .next a').attr('href', base + (Number(query.index) + 1))


  $.ajax({
    url: baseChapter + '/find?novelid=' + query.novelid + '&index=' + query.index,
    dataType: 'json',
    method: 'GET',
    crossDomain: true
  })
    .then(function (data, textStatus, jqXHR) {
      $('#chapter-title').text(data.title);
      data.body.split('\r\n').map(function (node) {
        $('#chapter-body').append('<p>' + node + '</p>')
      })

    }, function (jqXHR, textStatus, err) {
      console.log(jqXHR.responseJSON.msg);
      console.log(textStatus);
      console.log(err);
    })



}
// ?novelid=&index
function parseQuery(search) {
  var hashes = {};
  var hash = null;
  var query = search.slice(1).split('&');
  for (var i = 0; i < query.length; i++) {
    hash = query[i].split('=');
    hashes[hash[0]] = hash[1];
  }
  return hashes;
}

function loadProcess() {
  $(document).bind('ajaxSend', function () {
    $('.progress-bar').attr('aria-valuenow', '20').text(20).attr('style', 'width: 20%');
  }).bind('ajaxSuccess', function () {
    $('.progress-bar').attr('aria-valuenow', '80').text(80).attr('style', 'width: 80%');
  })
}

