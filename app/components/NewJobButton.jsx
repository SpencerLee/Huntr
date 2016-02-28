var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');
var Store     = require('../data/store');

var NewJobButton    = React.createClass({
  render: function() {
    return (
      <button className="newJobButton regularSize semiBold" onClick={this.onClick}>
        + New Job
      </button>
    );
  },
  onClick: function() {
    Store.setCreatingNewJob(true);
  }
});

module.exports = NewJobButton;