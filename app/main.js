var React       = require('react');
var ReactDOM    = require('react-dom');
var Board       = require('./components/Board.jsx')

var mockUserId = "12345";

ReactDOM.render(
  <Board />,
  document.getElementById('react-container')
);