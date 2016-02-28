var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');

var JobCard    = React.createClass({
  
  propTypes: {
    company: React.PropTypes.object,
    title: React.PropTypes.string,
    color: React.PropTypes.string,
    cities: React.PropTypes.array,
  },

  render: function() {
    return (
      <div className="jobCard">
        <img src={this.props.company.icon_url} />
        <p>{this.props.company.name}</p>
        <p>{this.props.title}</p>
      </div>
    );
  },
  onClick: function() {}
});

module.exports = JobCard;