var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var Store     = require('../data/store');
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var JobCard = require('./JobCard.jsx');

var List    = React.createClass({
  render: function() {
    var jobs = this.props.jobs;
    return (
      <div className="list">
        <img src={this.props.icon_url} />
        <p>{this.props.name}</p>
        {jobs.map(function(job) {
            return <JobCard company={job.company} title={job.title} color={job.company.hex_color} cities={job.cities} />
        })}
      </div>
    );
  },
});

module.exports = List;