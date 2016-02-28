var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');
var Store     = require('../data/store');

var NewJobForm    = React.createClass({
  getInitialState: function() {
    return {company: '', positionTitle: ''};
  },
  render: function() {
    return (
      <div>
        <div className="popupWhite" onClick={this.onBackGroundClick}>
        </div>
        <form className="newJobForm" onSubmit={this.handleSubmit}>
          <input placeholder="Company" className="textField regularSize" type="text" name="companyName"/><br/>
          <input placeholder="Position" className="textField regularSize" type="text" name="positionTitle"/><br/>
          <input className="submitButton regularSize" type="submit" value="Create Job"/>
        </form>
      </div>
    );
  },
  onClick: function() {},
  onBackGroundClick: function() {
    Store.setCreatingNewJob(false);
  },
  handleSubmit: function() {

  }
});

module.exports = NewJobForm;