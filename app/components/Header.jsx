var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');

var Header    = React.createClass({
  render: function() {
    return (
      <div className="header">
        <span className="logo xlargeSize semiBold">huntr</span>
      </div>
    );
  }
});

module.exports = Header;