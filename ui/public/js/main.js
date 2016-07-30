$(document).ready(function () {
  var flag_novel = 0;
  var flag_chapter = 0;
  $('#button-novel').on('click', function () {
    if (flag_novel == 0 && flag_chapter == 0) {
      $('.novellist').toggle();
      $('.chapterlist').css('margin-left', '40px');
      $('.chapter').css('margin-left', 'calc(20% + 40px)');
      $('.chapter').css('width', 'calc(80% - 40px)');
      flag_novel = 1;
      $('#button-novel').text('打开小说目录');
      return;
    }
    if (flag_novel == 1 && flag_chapter == 0) {
      $('.novellist').toggle();
      $('.chapterlist').css('margin-left', 'calc(20% + 40px)');
      $('.chapter').css('margin-left', 'calc(40% + 40px)');
      $('.chapter').css('width', 'calc(60% - 40px)');
      flag_novel = 0;
      $('#button-novel').text('关闭小说目录');
      return;
    }
    if (flag_novel == 0 && flag_chapter == 1) {
      $('.novellist').toggle();
      $('.chapter').css('margin-left', '40px');
      $('.chapter').css('width', 'calc(100% - 40px)');
      flag_novel = 1;
      $('#button-novel').text('打开小说目录');
      return;
    }
    if (flag_novel == 1 && flag_chapter == 1) {
      $('.novellist').toggle();
      $('.chapter').css('margin-left', 'calc(20% + 40px)');
      $('.chapter').css('width', 'calc(80% - 40px)');
      flag_novel = 0;
      $('#button-novel').text('关闭小说目录');
      return;
    }
  });
  $('#button-chapter').on('click', function () {
    if (flag_chapter == 0 && flag_novel == 0) {
      $('.chapterlist').toggle();
      $('.chapter').css('margin-left', 'calc(20% + 40px)');
      $('.chapter').css('width', 'calc(80% - 40px)');
      flag_chapter = 1;
      $('#button-chapter').text('打开章节目录');
      return;
    }
    if (flag_chapter == 1 && flag_novel == 0) {
      $('.chapterlist').toggle();
      $('.chapterlist').css('margin-left', 'calc(20% + 40px)');
      $('.chapter').css('margin-left', 'calc(40% + 40px)');
      $('.chapter').css('width', 'calc(60% - 40px)');
      flag_chapter = 0;
      $('#button-chapter').text('关闭章节目录');
      return;
    }
    if (flag_chapter == 0 && flag_novel == 1) {
      $('.chapterlist').toggle();
      $('.chapter').css('margin-left', '40px');
      $('.chapter').css('width', 'calc(100% - 40px)');
      flag_chapter = 1;
      $('#button-chapter').text('打开章节目录');
      return;
    }
    if (flag_chapter == 1 && flag_novel == 1) {
      $('.chapterlist').toggle();
      $('.chapter').css('margin-left', 'calc(20% + 40px)');
      $('.chapter').css('width', 'calc(80% - 40px)');
      flag_chapter = 0;
      $('#button-chapter').text('关闭章节目录');
      return;
    }
  });
  
})
