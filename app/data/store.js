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
  setInitialState: function() {
      // MOCK DATA
      // ===================
      
      // var lists = mockInitialState.lists;
      // store.lists = lists;
      // this.emitChange();

      // LIVE DATA, BUGGY
      // ===================
      
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/dashboard",
        success: function(result) {
          store.lists = result.lists
          this.emitChange();
        }.bind(this)
      });
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

        var promise = new Promise(function(resolve,reject) {
          $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/company",
            data: {
              name: newcompany.name,
              logoUrl: newcompany.squareLogo,
              hexColor: "#ddd",
              glassdoorId: newcompany.id
            },
            success: function(company) {
              $.ajax({
                type: "POST",
                url: "http://localhost:3000/api/job",
                data: {
                  jobTitle: positionTitle,
                  cities: [],
                  list: listId,
                  company: company._id
                },
                success: function(job) {
                  for (var idx in store.lists) {
                    var list = store.lists[idx];
                    job.company = company;
                    if (list._id == listId) {
                      store.lists[idx].jobs.push(job);
                      resolve();
                    }
                  };
                }
              });

            }
          });
        });

        promise.then(function() {
          this.emitChange();
        }.bind(this));
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