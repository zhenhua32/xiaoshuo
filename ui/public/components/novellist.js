require("babel-polyfill");
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

/**
 * -NovelListbox
 * --Novellist
 * ---Novel
 */
var NovelListBox = React.createClass({
  loadData: function (url) {
    $.ajax({
      url: url,
      dataType: 'json',
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
  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.data !== this.state.data
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
    var nodes = [];
    if (this.props.data) {
      nodes = this.props.data.map(function (node) {
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
    }
    return (
      <div>
        {nodes}
      </div>
    )
  }
});

var Novel = React.createClass({
  handleClick: function (event) {
    var id = this.props.id;
    $(this._div).siblings().removeClass('checked');
    $(this._div).addClass('checked');
    this.props.emitter.emit('novel-click', id);
  },
  render: function () {
    return (
      <div id={this.props.id} ref={(c) => this._div = c} >
        <p onClick={this.handleClick} >
          {this.props.title}
        </p>
        <p>{this.props.author}</p>
      </div>
    )
  }
})



module.exports = NovelListBox;
