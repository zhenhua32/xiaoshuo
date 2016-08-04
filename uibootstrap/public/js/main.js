// var $ = require('jquery');
$(document).ready(function () {
  // add novel list
  switch (window.location.pathname) {
    case '/':
      loadNovel();
      break;
    case '/novel.html':
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
    url: 'http://localhost:8008/novel/all',
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

  $.get('http://localhost:8008/novel/id/' + id)
    .then(function (data) {
      $('#novel').text(data.title);
    })

  $.ajax({
    url: 'http://localhost:8008/chapter/all?limit=9999&skip=0&novelid=' + id,
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
        )
      })

    }, function (jqXHR, textStatus, err) {
      console.log(jqXHR.responseJSON.msg);
      console.log(textStatus);
      console.log(err);
    })

}

function loadContent() {
  var query = parseQuery(window.location.search);

  var base = '/chapter.html?novelid=' + query.novelid +'&index=';

  if (query.index == 1) {
    $('.pager .previous').addClass('disabled');
  } else {
    $('.pager .previous a').attr('href', base + (Number(query.index) - 1))
  }

  $('.pager .next a').attr('href', base + (Number(query.index) + 1))


  $.ajax({
    url: 'http://localhost:8008/chapter/find?novelid=' + query.novelid + '&index=' + query.index,
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
// >novelid=&index
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

