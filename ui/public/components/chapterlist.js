require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');

/**
 * -ChapterListBox
 * --ChapterList
 * ---ChapterNode
 */

var ChapterListBox = React.createClass({
  loadData: function (url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        if (this.isMounted())
          this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    if (this.props.url) this.loadData(this.props.url);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.data !== this.state.data
  },
  componentWillReceiveProps: function (nextProps) {
    if(this.props.url !== nextProps.url) this.loadData(nextProps.url);
  },
  render: function () {
    return (
      <div className="chapterlist">
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
          key: 'index' + node.index,
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
    this.props.emitter.emit('chapter-click', id);
  },
  render: function () {
    return (
      <p onClick={this.handleClick} >{this.props.title}</p>
    )
  }
})

// ReactDOM.render(
//   <ChapterListBox
//     url="http://localhost:8008/chapter/all?novelid=579078a1b7116d9c34b8d06b&limit=50&skip=0"/>,
//   document.getElementById('example')
// )


module.exports = ChapterListBox;
