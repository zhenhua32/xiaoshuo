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
        chapter_list_url: base + '/chapter/all?novelid=' + id
      })
    });
    emitter.on('chapter-click', function (id) {
      self.setState({
        chapter_url: base + '/chapter/findbyid?id=' + id
      })
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
