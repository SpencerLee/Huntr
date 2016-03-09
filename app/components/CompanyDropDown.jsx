var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var HTML5Backend = require('react-dnd-html5-backend');
var Store     = require('../data/store');

var CompanyOption = React.createClass({
  render: function() {
    return (
          <p onClick={this.handleSelectCompany}> {this.props.company.name} <span style={{ opacity: 0.3, marginLeft: 15}}>{this.props.company.industry}</span></p>
  )},
  handleSelectCompany: function () {
    this.props.onSelection(this.props.company);
  }
});

var CompanyDropDown    = React.createClass({
  render: function() {
    return (
      <div className="dropdownContainer">
        {this.props.companies.map(function(company) {
          return <CompanyOption company={company} onSelection={this.handleSelectCompany}/>
        }.bind(this))}
      </div>
    );
  },
  handleSelectCompany: function(company) {
    this.props.onCompanySelect(company);
  }
});

module.exports = CompanyDropDown;