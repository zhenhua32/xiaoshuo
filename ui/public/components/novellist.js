require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');

/**
 * -NovelListbox
 * --Novellist
 * ---Novel
 */
var NovelListBox = React.createClass({
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
    if(this.props.url) this.loadData();
    this.props.emitter.on('novel-click', function(id){

    })
  },
  render: function () {
    return (
      <div className="novellist">
        <h1>小说列表</h1>
        <Novellist data={this.state.data} emitter={this.props.emitter} />
      </div>
    )
  }
})

var Novellist = React.createClass({
  render: function () {
    var emitter = this.props.emitter;
    var nodes = this.props.data.map(function (node) {
      var props = {
        author: node.author,
        title: node.title,
        key: node._id,
        id: node._id,
        emitter: emitter
      };
      return (
        <Novel {...props}>
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
  handleClick: function() {
    var id = this.props.id;
    this.props.emitter.emit('novel-click', id);
  },
  render: function () {
    return (
      <div id={this.props.id} onClick={this.handleClick} >
        <p>{this.props.title}</p>
        <p>{this.props.author}</p>
      </div>
    )
  }
})

// ReactDOM.render(
//   <NovelListBox  url="http://localhost:8008/novel/all" />,
//   document.getElementById('example')
// )

module.exports = NovelListBox;
