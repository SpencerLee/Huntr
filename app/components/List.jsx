var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var Store     = require('../data/store');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var JobCard = require('./JobCard.jsx');
var NewJobButton = require('./NewJobButton.jsx');

var List    = React.createClass({
  render: function() {
    var listIndex = this.props.listIndex;
    return (
      <div className="list">
        <div className="listHeader">
          <img className="floatLeft listIcon" src={"/images/list_icon_" + this.props.icon_url} />
          <div>
            <span className="listName">{this.props.name.toUpperCase()}</span><br/>
            <span className="listCount smallSize seethrough30">{this.props.jobs.length + " positions"}</span>
          </div>
        </div>
        {this.props.jobs.map(function(job,idx) {
            return <JobCard job={job} key={job._id} listIndex={listIndex} indexInList={idx} company={job.company} title={job.jobTitle} color={job.company.hexColor} cities={job.cities} />
        })}
        <NewJobButton listId={this.props.listId} listIndex={this.props.listIndex}/>
      </div>
    );
  },
});

module.exports = List;