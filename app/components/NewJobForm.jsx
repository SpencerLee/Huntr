var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');
var Store     = require('../data/store');
var CompanyDropDown   = require('./CompanyDropDown.jsx');
var Glassdoor = require('../api/request/glassdoorRequest');


var NewJobForm    = React.createClass({
  getInitialState: function() {
    return {
      companyName: '',
      company: null, 
      positionTitle: '', 
      glassdoorCompanies: []};
  },
  render: function() {

    var dropDown = null;

    if (this.state.glassdoorCompanies.length > 0) {
      dropDown = <CompanyDropDown onCompanySelect={this.handleCompanySelect} companies={this.state.glassdoorCompanies}/>
    };

    return (
      <div>
        <div className="popupWhite" onClick={this.onBackGroundClick}>
        </div>
        <form autoComplete="off" className="newJobForm" onSubmit={this.handleSubmit}>
          <input value={this.state.companyName} onChange={this.handleCompanyChange} placeholder="Company" className="textField regularSize" type="text" name="companyName"/><br/>
          <input value={this.state.positionTitle} onChange={this.handlePositionChange} placeholder="Position" className="textField regularSize" type="text" name="positionTitle"/><br/>
          <input className="submitButton regularSize" type="submit" value="Create Job"/>
          {dropDown}
        </form>
      </div>
    );
  },
  onBackGroundClick: function() {
    Store.setCreatingNewJob(false,null);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var company = this.state.company;
    var positionTitle = this.state.positionTitle.trim();
    if (!company || !positionTitle) {
      return;
    }
    // TODO: send request to the server
    
    Store.addJob(this.props.listId,company,positionTitle);
    this.setState({company: null, positionTitle: ''});
    Store.setCreatingNewJob(false,null);
  },

  handleCompanyChange: function(e) {
    console.log(e.target.value);
    Glassdoor.getResponseForCompany(e.target.value, function(response) {
      console.log(response);
      this.setState({glassdoorCompanies: response});
    }.bind(this));
    this.setState({companyName: e.target.value});
  },

  handlePositionChange: function(e) {
    console.log(e.target.value);
    this.setState({positionTitle: e.target.value});
  },

  handleCompanySelect: function(company) {
    this.setState({company:company, companyName:company.name, glassdoorCompanies: []});
  }
});

module.exports = NewJobForm;