var React       = require('react');
var ReactDOM    = require('react-dom');
var Board       = require('./components/Board.jsx')

ReactDOM.render(
  <Board userId={$("#userId").html()}/>,
  document.getElementById('react-container')
);