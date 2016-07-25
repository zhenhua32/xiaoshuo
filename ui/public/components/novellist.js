// var React = require('react');
// var ReactDOM = require('react-dom');

var data = [{
  title: 'nihao'
}, {
    title: 'guoqu'
  }, {
    title: 'laizi'
  }]

var Novelbox = React.createClass({
  render: function () {
    return (
      <div >
        <h1>novel list</h1>
        <Novellist data={this.props.data}/>
      </div>
    )
  }
})

var Novellist = React.createClass({
  render: function () {
    var nodes = this.props.data.map(function (node) {
      return (
        <li>
          {node.title}
        </li>
      )
    })
    return (
      <novel>
        {nodes}
      </novel>
    )
  }
});

var Novel = React.createClass({
  render: function () {
    return (
      <div>
      <h2></h2>
      </div>
    )
  }
})

ReactDOM.render(
  <Novelbox data={data} />,
  document.getElementById('example')
)


