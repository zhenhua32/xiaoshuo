require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
// react components
var NovelListBox = require('./novellist');
var ChapterBox = require('./chapter');
var ChapterListBox = require('./chapterlist');
// event
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();
/**
 * 
 */
var App = React.createClass({
  render: function () {
    var props1 = {
      url: this.props.novel_list_url,
      emitter: this.props.emitter
    }
    var props2 = {
      url: this.props.chapter_list_url,
      emitter: this.props.emitter
    }
    var props3 = {
      url: this.props.chapter_url,
      emitter: this.props.emitter
    }
    return (
      <div className="app">
        <div className="left">
          <NovelListBox {...props1} />
          <ChapterListBox {...props2} />
        </div>
        <div className="rigth">
          <ChapterBox  {...props3} />
        </div>
      </div>
    )
  }
})

var props = {
  emitter: emitter,
  novel_list_url: 'http://localhost:8008/novel/all',
  chapter_list_url: 'http://localhost:8008/chapter/all?novelid=579078a1b7116d9c34b8d06b&limit=50&skip=0',
  chapter_url: 'http://localhost:8008/chapter/find?novelid=579078a1b7116d9c34b8d062&index=1'
}

ReactDOM.render(
  <App {...props}/>,
  document.getElementById('example')
)
