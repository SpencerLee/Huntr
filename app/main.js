var React       = require('react');
var ReactDOM    = require('react-dom');
var Board       = require('./components/Board.jsx');

ReactDOM.render(
  <Board user={user}/>,
  document.getElementById('react-container')
);