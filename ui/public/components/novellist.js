require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');

/**
 * -Novelbox
 * --Novellist
 * ---Novel
 */
var Novelbox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div >
        <h1>novel list</h1>
        <Novellist data={this.state.data}/>
      </div>
    )
  }
})

var Novellist = React.createClass({
  render: function () {
    var nodes = this.props.data.map(function (node) {
      var props = {
        author: node.author,
        // title: node.title,
        key: node._id
      };
      return (
        <Novel {...props}>
          {node.title}
        </Novel>
      )
    })
    return (
      <div>
        {nodes}
      </div>
    )
  }
});

var Novel = React.createClass({
  render: function () {
    return (
      <div>
        <h2>{this.props.children}</h2>
        <h3>{this.props.author}</h3>
      </div>
    )
  }
})

ReactDOM.render(
  <Novelbox  url="http://localhost:8008/novel/all" />,
  document.getElementById('example')
)

module.exports = Novellist;
