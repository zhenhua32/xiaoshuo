require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');

/**
 * -ChapterListBox
 * --ChapterList
 * ---ChapterNode
 */

var ChapterListBox = React.createClass({
  loadData: function () {
    $.ajax({
      url: this.props.url,
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
    if (this.props.url) this.loadData();
    
  },
  render: function () {
    return (
      <div className="chapterlist">
        <h1>章节目录</h1>
        <ChapterList data={this.state.data} />
      </div>
    )

  }
})

var ChapterList = React.createClass({
  render: function () {
    var nodes = [];
    if (this.props.data) {
      nodes = this.props.data.map(function (node) {
        var props = {
          key: 'index' + node.index,
          title: node.title
        }
        return (
          <ChapterNode {...props}></ChapterNode>
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
  render: function () {
    return (
      <p>{this.props.title}</p>
    )
  }
})

// ReactDOM.render(
//   <ChapterListBox
//     url="http://localhost:8008/chapter/all?novelid=579078a1b7116d9c34b8d06b&limit=50&skip=0"/>,
//   document.getElementById('example')
// )


module.exports = ChapterListBox;
