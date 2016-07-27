require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');


/**
 * 
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
      <div>
        <ChapterHead title={this.props.title} author={this.props.author}/>
        <ChapterBody />
        <ChapterFoot />
      </div>
    )
  }
})

var ChapterHead = React.createClass({
  render: function () {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.author}</h2>
      </div>
    )
  }
})

var ChapterBody = React.createClass({
  render: function () {
    var ps = this.props.body.split('/r/n').map(function (data) {
      return (
        <p>data</p>
      )
    })
    return (
      <div>
        {ps}
      </div>
    )
  }
})

var ChapterFoot = React.createClass({
  render: function () {
    return (
      <div>
        <span>上一页</span>
        <span>下一页</span>
      </div>
    )
  }
})


ReactDOM.render(
  <ChapterBox url="http://localhost:8008/chapter?id=&index=1" />,
  document.getElementById('example')
)
