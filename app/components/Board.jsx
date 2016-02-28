var React     = require('react');
var ReactDOM  = require('react-dom');
// var PropTypes = React.PropTypes;
var Store     = require('../data/store');
// var DragSource = require('react-dnd').DragSource;
// var HTML5Backend = require('react-dnd-html5-backend');
// var DragDropContext = require('react-dnd').DragDropContext;
var List    = require('./List.jsx');

var Board = React.createClass({
    getInitialState: function() {
      return Store.getBoardState();
    },
    render: function() {
      console.log("Rendering initial state");
      var lists = this.state.lists;
      console.log(this.state);
      return (
        <div>
          {lists.map(function(list) {
            return <List listId={list._id} name={list.name} icon_url={list.icon_url} jobs={list.jobs}/>;
          })}
        </div>
      )
    },

    // Sync with Store
    // =====================
    
    _onChange: function() {
      console.log("Updating Board State");
      this.setState(Store.getBoardState());
    },
    componentDidMount: function() {
      console.log("getting initial state");
      Store.addChangeListener(this._onChange);
      Store.setInitialState(this.props.userId);
    },
    componentWillUnmount: function() {
      Store.removeChangeListener(this._onChange);
    },
});

module.exports = Board;