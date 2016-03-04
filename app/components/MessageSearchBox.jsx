var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var Store     = require('../data/store');
var Glassdoor = require('../api/request/glassdoorRequest');
var MessageDetail = require('./MessageDetail.jsx');
var Gmail     = require('../api/request/gmail.js');

var MessageSearchBox = React.createClass({
  propTypes: {
    jobTitle:     React.PropTypes.string,
    companyName:  React.PropTypes.string,
  },
  // Example message: {threadId:432, id: 1234,snippet: Hey Rennie, it was great..., from:{name:Rennie,email:rennieh@hotmail.com},date:14234920293,subject:hello world,}
  getInitialState: function() {    
    return {
      messagesInSearch: [],
      selectedMessages: [],
      searchQuery: "from:" + this.props.companyName.toLowerCase(),
    }
  },
  render: function() {

    var addButton = null;
    if (this.state.messagesInSearch.length > 0) {
      addButton = <button onClick={this.handleAddMessages}>Add Messages</button>
    };

    return (
      <div className="emailSearchBox">
        <input onChange={this.handleQueryChange} value={this.state.searchQuery} placeholder="Search Gmail" className="emailSearchField smallSize" type="text" name="searchString"/><br/>
        <button onClick={this.handleSearch} className="emailSearchButton" type="submit"><img src="/images/searchIcon.png"/></button>
        <div className="emailSearchResults">
          {this.state.messagesInSearch.map(function(message) {
            return <MessageDetail message={message}/>
          })}
        </div>
        {addButton}
      </div>
    );
  },
  handleSearch: function() {
    // Make Gmail call, populate messagesInSearch, and reset component's state
    Gmail.getListOfMessages(this.props.user.id,this.state.searchQuery,this.props.user.token, function(emails) {
      console.log(emails);
      this.setState({messagesInSearch: emails});
    }.bind(this));
  },
  handleAddMessages: function() {
    // Call store to add all selectedMessages to specific job... and rerender
  },
  handleQueryChange: function(e) {
    this.setState({searchQuery: e.target.value});
  },
  componentDidMount: function() {
    this.handleSearch();
  }
});

module.exports = MessageSearchBox;