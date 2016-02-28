var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var mockInitialState = require('./mockData_getInitialState')

// THIS IS OUR GLOBAL STATE
// ========================

var store = {
    lists:[],
    creatingNewJob: false,
    creatingNewJobForList: null
  };


var CHANGE_EVENT = 'state-changed';
var Store = assign({}, EventEmitter.prototype, {

  // Initilize
  // =======================
  setInitialState: function(userId) {
      console.log("I'm Here");
      var lists = mockInitialState.lists;
      store.lists = lists;
      console.log(store.lists);
      this.emitChange();
  },

  getBoardState: function() {
    return store;
  },

  // State
  // =======================
  
  setCreatingNewJob: function(value,listId) {
    store.creatingNewJob = value;
    store.creatingNewJobForList = listId;
    this.emitChange();
  },

  // List
  // =======================
  
  getList: function(id) {
    return store.lists[id];
  },

  getLists: function() {
    return store.users;
  },

  addList: function(list) {
    // $.ajax({
    //   type: "POST",
    //   url: "http://localhost:3000/api/users",
    //   data: user,
    //   success: function(result) {
    //     store.users[result._id] = result;
    //     Store.emitChange();
    //   }
    // });
  },
  updateList: function(id, updates) {
    // Need to make post to server here
    list = this.getlists();
    this.emitChange();
  },
  removeList: function(id) {
    delete store.lists[id];
    this.emitChange();
  },

  // Job
  // =======================
  
  getJob: function(jobId) {
    return store.lists[id];
  },

  getJobs: function(listId) {
    return store.users;
  },

  addJob: function(listId,newcompany,positionTitle) {
    for (var idx in store.lists) {
      var list = store.lists[idx];
      if (list._id == listId) {
        list.jobs.push({
          _id:"3",
          title:positionTitle,
          company: {
            name: newcompany.name,
            icon_url: newcompany.squareLogo,
            glassdoor_id: newcompany.id,
            hex_color: "rgba(0,0,0,0.2)",
          }
        })
      }
    };
    this.emitChange();
  },
  moveCard: function (indexOne,listOne,indexTwo,listTwo) {
    if (listOne != listTwo) {
      // Remove from one list and add it to the other
      var tempJob = store.lists[listOne]["jobs"][indexOne];
      store.lists[listTwo]["jobs"].splice(indexTwo,0,tempJob);
      store.lists[listOne]["jobs"].splice(indexOne,1);
    } else {
      // Swap Them
      var tempJob = store.lists[listOne]["jobs"][indexOne];
      store.lists[listOne]["jobs"][indexOne] = store.lists[listTwo]["jobs"][indexTwo]
      store.lists[listTwo]["jobs"][indexTwo] = tempJob;
    }

    this.emitChange();
  },
  updateJob: function(id, updates) {
  },
  removeJob: function(id) {
  },

  // Board
  // =======================

  // Notifications
  // =========================
  
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    console.log("Emitting change");
    this.emit(CHANGE_EVENT);
  }
});


module.exports = Store