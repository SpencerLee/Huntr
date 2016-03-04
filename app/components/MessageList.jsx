var React     = require('react');
var ReactDOM  = require('react-dom');
var PropTypes = React.PropTypes;
var Store     = require('../data/store');
var Glassdoor = require('../api/request/glassdoorRequest');

var MessageList = React.createClass({
  propTypes: {
    messages: React.PropTypes.array,
  },
  // Example message: {threadId:432, id: 1234,snippet: Hey Rennie, it was great..., from:{name:Rennie,email:rennieh@hotmail.com},date:14234920293,subject:hello world,}
  render: function() {
    return (
      <div className="emailList">
      
      </div>
    );
  },
  handleSearchMessageButton: function() {
    // Call store and update the variable to view Searchbox instead
  },
});

module.exports = MessageList;