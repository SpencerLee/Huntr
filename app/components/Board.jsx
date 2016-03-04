var React     = require('react');
var ReactDOM  = require('react-dom');
var Store     = require('../data/store');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var List    = require('./List.jsx');
var NewJobForm = require('./NewJobForm.jsx');
var JobDetails = require('./JobDetails.jsx');
var Header = require('./Header.jsx');

var Board = React.createClass({
    getInitialState: function() {
      return Store.getBoardState();
    },
    render: function() {
      var lists = this.state.lists;
      var creatingJob = this.state.creatingNewJob;
      var viewingJob = this.state.viewingJob;
      var popup = null;
      if (creatingJob) {
        console.log("Creating Job");
        popup = <NewJobForm listId={this.state.creatingNewJobForList} />;
      } else if (viewingJob) {
        console.log("Viewing Job");
        popup = <JobDetails job={Store.getJob(this.state.viewingJobId)} />;
      }

      return (
        <div style={{overflow: 'scroll'}}>
          {popup}
          <Header user={this.props.user}/>
          <div style={{width: lists.length * 400}}>
            {lists.map(function(list,idx) {
              return <List listIndex={idx} listId={list._id} name={list.name} icon_url={list.iconName} jobs={list.jobs}/>;
            })}
          </div>
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
      console.log("Getting initial state");
      Store.setUser(this.props.user);
      Store.addChangeListener(this._onChange);
      Store.setInitialState();
    },
    componentWillUnmount: function() {
      Store.removeChangeListener(this._onChange);
    },
});

module.exports = DragDropContext(HTML5Backend)(Board);