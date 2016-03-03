var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DropTarget = require('react-dnd').DropTarget;
var HTML5Backend = require('react-dnd-html5-backend');
var Store     = require('../data/store');

var collectTarget = function(connect) {
    return {
      connectDropTarget: connect.dropTarget(),
    } 
};

var buttonTarget = {
  drop: function(props, monitor, component) {
    var dragIndex = monitor.getItem().originalCardIndex;
    var dragList = monitor.getItem().originalListIndex;
    var hoverIndex = 0;
    var hoverList = props.listIndex;
    console.log("Drop info");
    console.log(dragIndex);
    console.log(dragList);
    console.log(hoverIndex);
    console.log(hoverList);
    Store.moveCard(dragIndex,dragList, hoverIndex,hoverList);
  }
};

var NewJobButton    = React.createClass({
  render: function() {
    var connectDropTarget = this.props.connectDropTarget;
    return connectDropTarget(
      <button className="newJobButton regularSize" onClick={this.onClick}>
        <span className="semiBold xlargeSize addIcon">+</span><span>  New Job</span>
      </button>
    );
  },
  onClick: function() {
    Store.setCreatingNewJob(true,this.props.listId);
  }
});

module.exports = DropTarget("jobCard",buttonTarget,collectTarget)(NewJobButton);