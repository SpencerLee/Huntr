var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var mockInitialState = require('./mockData_getInitialState')

// THIS IS OUR GLOBAL STATE
// ========================

var store = {
    lists:[],
    creatingNewJob: false
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
  setCreatingNewJob: function(value) {
    store.creatingNewJob = value;
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

  addJob: function(listId,indexPosition) {
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