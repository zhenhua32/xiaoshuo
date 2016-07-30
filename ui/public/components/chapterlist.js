require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
var nodeurl = require('url');
var nodequery = require('querystring');

/**
 * -ChapterListBox
 * --ChapterList
 * ---ChapterNode
 */

var ChapterListBox = React.createClass({
  loadData: function (url, isnewnovel) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        if (this.isMounted()) {
          if (isnewnovel) {
            this.setState({ data: data });
            $(this._div).scrollTop(0);
          } else {
            this.setState({ data: this.state.data.concat(data) });
          }
        }

      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleScroll: function (event) {
    var divH = $(this._div)[0].clientHeight;
    var scrollH = $(this._div)[0].scrollHeight;
    var scrollT = $(this._div)[0].scrollTop;
    if (scrollH - scrollT - 0.5 < divH) {
      this.props.emitter.emit('scroll-bottom');
    }
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    if (this.props.url) this.loadData(this.props.url, true);
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.data !== this.state.data;
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.url !== nextProps.url) {
      let a = nodequery.parse(nodeurl.parse(this.props.url).query).novelid;
      let b = nodequery.parse(nodeurl.parse(nextProps.url).query).novelid;
      if (a === b)
        this.loadData(nextProps.url, false);
      else
        this.loadData(nextProps.url, true);
    }
  },
  render: function () {
    return (
      <div className="chapterlist" onScroll={this.handleScroll}
        ref={(c) => this._div = c} >
        <h1>章节目录</h1>
        <ChapterList data={this.state.data} emitter={this.props.emitter} />
      </div>
    )
  }
})

var ChapterList = React.createClass({
  render: function () {
    var emitter = this.props.emitter;
    var nodes = [];
    if (this.props.data) {
      nodes = this.props.data.map(function (node) {
        var props = {
          key:  node.index +''+ Date.now(),
          title: node.title,
          index: node.index,
          id: node._id,
          emitter: emitter,
        }
        return (
          <ChapterNode {...props}>
          </ChapterNode>
        )
      })
    }

    return (
      <div>
        {nodes}
      </div>
    )
  }
})

var ChapterNode = React.createClass({
  handleClick: function () {
    var id = this.props.id;
    $(this._p).siblings().removeClass('checked');
    $(this._p).addClass('checked');
    this.props.emitter.emit('chapter-click', id);
  },
  render: function () {
    return (
      <p onClick={this.handleClick} ref={(c) => this._p = c}>
        {this.props.title}
      </p>
    )
  }
})




module.exports = ChapterListBox;
