require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');


/**
 * -ChapterBox
 * --ChapterHead
 * --ChapterBody
 * --ChapterFoot
 */
var ChapterBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="chapter">
        <ChapterHead title={this.state.data.title} author={this.state.data.author}/>
        <ChapterBody body={this.state.data.body} />
        <ChapterFoot />
      </div>
    )
  }
})

var ChapterHead = React.createClass({
  render: function () {
    return (
      <div className="chapterhead">
        <h1>{this.props.title}</h1>
        <h2>{this.props.author}</h2>
      </div>
    )
  }
})

var ChapterBody = React.createClass({
  render: function () {
    var ps = [];
    var key = 0;
    if (this.props.body) {
      ps = this.props.body.split('\r\n').map(function (data) {
        key++;
        return (
          <ChapterP key={key}>{data}</ChapterP>
        )
      });
      console.log(ps.length)
    }

    return (
      <div>
        {ps}
      </div>
    )
  }
})

var ChapterP = React.createClass({
  render: function() {
    return (
      <p>{this.props.children}</p>
    )
  }
})

var ChapterFoot = React.createClass({
  render: function () {
    return (
      <div className="chapterfoot">
        <span><button>上一页</button></span>
        <span><button>下一页</button></span>
      </div>
    )
  }
})


ReactDOM.render(
  <ChapterBox url="http://localhost:8008/chapter/find?novelid=579078a1b7116d9c34b8d062&index=1" />,
  document.getElementById('example')
)
