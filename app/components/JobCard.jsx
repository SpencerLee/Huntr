var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var Store     = require('../data/store');

var cardTarget = {
  // drop: function(props, monitor, component) {
  //   var dragIndex = monitor.getItem().originalCardIndex;
  //   var dragList = monitor.getItem().originalListIndex;
  //   var hoverIndex = props.indexInList;
  //   var hoverList = props.listIndex;
  //   console.log("Drop info");
  //   console.log(dragIndex);
  //   console.log(dragList);
  //   console.log(hoverIndex);
  //   console.log(hoverList);
  //   Store.moveCard(dragIndex,dragList, hoverIndex,hoverList);
  // },
  hover: function(props, monitor, component) {
    var dragIndex = monitor.getItem().originalCardIndex;
    var dragList = monitor.getItem().originalListIndex;
    var hoverIndex = props.indexInList;
    var hoverList = props.listIndex;

    if (dragIndex === hoverIndex && dragList === hoverList) {
      return;
    }

    console.log("Drop info");
    console.log(dragIndex);
    console.log(dragList);
    console.log(hoverIndex);
    console.log(hoverList);
    Store.moveCard(dragIndex,dragList, hoverIndex,hoverList);
    monitor.getItem().originalCardIndex = hoverIndex;
    monitor.getItem().originalListIndex = hoverList;
  }
};


var cardSource = {
  beginDrag: function(props) {
    return {
      id: props.id,
      originalListIndex: props.listIndex,
      originalCardIndex: props.indexInList,
    };
  }
};

var collectTarget = function(connect) {
    return {
      connectDropTarget: connect.dropTarget(),
    }
};

var collectSource = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
};

var JobCard    = React.createClass({
  getRandomColor: function() {
    var colors = [
      "rgba(252,189,0,0.85)",
      "rgba(255,136,13,0.85)",
      "rgba(57,87,155,0.85)",
      "rgba(201,37,46,0.85)",
      "rgba(14,99,251,0.85)",
      "rgba(247,174,79,0.85)"
    ]
    return colors[Math.floor(Math.random()*colors.length)];
    
  },
  propTypes: {
    job: React.PropTypes.object,
    company: React.PropTypes.object,
    title: React.PropTypes.string,
    color: React.PropTypes.string,
    cities: React.PropTypes.array,
    indexInList: React.PropTypes.number,
    listIndex: React.PropTypes.number
  },

  render: function() {
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;
    var isDragging = this.props.isDragging;

    return connectDragSource(connectDropTarget(
      <div>
        <img src="/images/delete.png" className={isDragging ? "deleteButtonDragging":"deleteButton" } onClick={this.onDeleteClick}/>
        <div onClick={this.onClick} className="jobCard" style={{ backgroundColor: this.props.color,opacity: isDragging ? 0 : 1,fontSize: 25,fontWeight: 'bold',cursor: 'pointer'}}>
          <img id={this.props.company._id} className={"logo floatLeft " + this.props.company.name} src={this.props.company.logoUrl} />
          <div className="floatLeft">
            <p className="semiBold regularSize">{this.props.company.name}</p>
            <p className="regular xsmallSize seethrough60">{this.props.title}</p>
          </div>
        </div>
      </div>
    ));
  },
  onClick: function() {
    Store.setViewingJob(true,this.props.job._id);
  },
  onDeleteClick: function() {
    Store.removeJob(this.props.job._id,this.props.listIndex);
  },
  componentDidMount: function () {}
});

module.exports = 
DropTarget("jobCard", cardTarget, collectTarget)(
DragSource("jobCard",cardSource,collectSource)(JobCard));
