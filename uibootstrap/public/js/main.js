// var $ = require('jquery');
$(document).ready(function () {
  // add novel list
  loadNovel();
  loadChapter();

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
      $('#novel').append(data.title);
    })

  $.ajax({
    url: 'http://localhost:8008/chapter/all?novelid=' + id,
    dataType: 'json',
    method: 'GET',
    crossDomain: true
  })
    .then(function (data, textStatus, jqXHR) {
      data.map(function (node) {
        $('#chapterlist').append(
          '<a href="/novel.html?id=' + node._id + '" class="list-group-item">' + node.title + '</a>'
        )
      })

    }, function (jqXHR, textStatus, err) {
      console.log(jqXHR.responseJSON.msg);
      console.log(textStatus);
      console.log(err);
    })

}
