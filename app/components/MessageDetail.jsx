var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');

var MessageDetail    = React.createClass({
  render: function() {
    return (
      <div className="messageDetail">
        <p className="smallSize semiBold from">{this.props.message.from}</p>
        <p className="subject">{this.props.message.subject}</p>
        <p className="xsmallSize snippet">{this.props.message.snippet}</p>
      </div>
    );
  }
});

module.exports = MessageDetail;