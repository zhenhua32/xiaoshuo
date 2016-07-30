require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
// react components
var NovelListBox = require('./novellist');
var ChapterBox = require('./chapter');
var ChapterListBox = require('./chapterlist');
// event
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }

const emitter = new MyEmitter();
// url parse
const url = require('url');
const querystring = require('querystring');

/**
 * 
 */
var App = React.createClass({
  getInitialState: function () {
    return {
      novel_list_url: 'http://localhost:8008/novel/all',
      chapter_list_url: 'http://localhost:8008/chapter/all?novelid=579078a1b7116d9c34b8d06b&limit=50&skip=0',
      chapter_url: 'http://localhost:8008/chapter/find?novelid=579078a1b7116d9c34b8d062&index=1'
    };
  },
  componentDidMount: function () {
    var base = 'http://localhost:8008';
    var self = this;
    emitter.on('novel-click', function (id) {
      self.setState({
        chapter_list_url: base + '/chapter/all?novelid=' + id + '&limit=50&skip=0'
      })
    });
    emitter.on('chapter-click', function (id) {
      self.setState({
        chapter_url: base + '/chapter/findbyid?id=' + id
      })
    });
    emitter.on('scroll-bottom', function () {
      let urlobj = url.parse(self.state.chapter_list_url);
      let urlqueryobj = querystring.parse(urlobj.query);
      
      if (!urlqueryobj.skip) urlqueryobj.skip = '50';
      else urlqueryobj.skip = (Number(urlqueryobj.skip) + 50).toString();
      // 赋值到 search 是因为 url.format 函数的逻辑是先判断 serach 是否存在
      // 优先使用 search 而不是 query
      urlobj.search = querystring.stringify(urlqueryobj);
      self.setState({
        chapter_list_url: url.format(urlobj)
      });
    })
  },
  render: function () {
    var props1 = {
      url: this.state.novel_list_url,
      emitter: this.props.emitter
    }
    var props2 = {
      url: this.state.chapter_list_url,
      emitter: this.props.emitter
    }
    var props3 = {
      url: this.state.chapter_url,
      emitter: this.props.emitter
    }
    return (
      <div className="app">
        <NovelListBox {...props1} />
        <ChapterListBox {...props2} />
        <ChapterBox  {...props3} />

      </div>
    )
  }
})

var props = {
  emitter: emitter
}

ReactDOM.render(
  <App {...props}/>,
  document.getElementById('app')
)
