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
      <div className="jobCard" style={{ backgroundColor: this.props.color }}>
        <img className="floatLeft" src={this.props.company.icon_url} />
        <div className="floatLeft">
          <p className="semiBold regularSize">{this.props.company.name}</p>
          <p className="regular xsmallSize seethrough60">{this.props.title}</p>
        </div>
      </div>
    );
  },
  onClick: function() {}
});

module.exports = JobCard;