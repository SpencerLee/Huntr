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
  persistListSwitch: function(listObj){
    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/api/list",
      data: {
        list_id: listObj.list_id,
        name: listObj.name,
        iconName: listObj.iconName,
        board: listObj.board,
        jobs: listObj.jobs,
        job: null
      },
      success: function(list){
        list
      }
    });

  },
  persitJobSwitcher: function(jobObj, listObject) {
    if(jobObj){
      var promise = new Promise(function(resolve,reject) {
        $.ajax({
          type: "PUT",
          url: "http://localhost:3000/api/job",
          data: {
            job_id: jobObj.job_id,
            jobTitle: jobObj.jobTitle,
            cities: jobObj.cities,
            list: jobObj.newLstId,
            company: jobObj.company
          },
          listObject: listObject,
          success: function (job) {
            var listObj = this.listObject;
            //this.listObject.jobs.push(job);
            //this.persistListSwitch(this.listObject)
            var jobId = job._id;
            var listJobId = [job._id];
            this.listObject.jobs.forEach(function (preJob) {
              if (preJob._id != job._id) {
                listJobId.push(preJob._id);
              }
            });
            $.ajax({
              type: "PUT",
              url: "http://localhost:3000/api/list",
              data: {
                list_id: listObj.list_id,
                name: listObj.name,
                iconName: listObj.iconName,
                board: listObj.board,
                jobs: listJobId,
                job: jobId
              },
              success: function (list) {
                list
                resolve();
              }
            });
          }
        });
      });
      promise.then();
    }

    else{
      var listJobId = [];
      listObject.jobs.forEach(function(job){
        listJobId.push(job._id);
      });
      listObject.jobs = listJobId;
      this.persistListSwitch(listObject)
    }
  },

  moveCard: function (indexOne,listOne,indexTwo,listTwo) {
    if (listOne != listTwo) {
      // Remove from one list and add it to the other
      var tempJob = store.lists[listOne]["jobs"][indexOne];
      store.lists[listTwo]["jobs"].splice(indexTwo,0,tempJob);
      store.lists[listOne]["jobs"].splice(indexOne,1);
      var list_1 = store.lists[listOne];
      var list_2 = store.lists[listTwo];
      var list_1Obj = {
        list_id: list_1._id,
        name: list_1.name,
        iconName: list_1.iconName,
        board: list_1.board,
        jobs: list_1.jobs
      };
      var list_2Obj = {
        list_id: list_2._id,
        name: list_2.name,
        iconName: list_2.iconName,
        board: list_2.board,
        jobs: list_2.jobs
      };
      var jobObj = {
        job_id: tempJob._id,
        jobTitle: tempJob.jobTitle,
        cities: tempJob.cities,
        newLstId: list_2._id,
        company: tempJob.company._id
      };
      this.persitJobSwitcher(null, list_1Obj);
      this.persitJobSwitcher(jobObj, list_2Obj);
      //this.persistJobSwitch(list_1._id, list_1.name, list_1.iconName,
      //  list_1.board, list_1.jobs);
      //this.persistJobSwitch(list_2._id, list_2.name, list_2.iconName,
      //  list_2.board, list_2.jobs);
      //$.ajax({
      //  type: "PUT",
      //  url: "http://localhost:3000/api/list",
      //  data: {
      //    list_id: store.lists[listTwo]._id,
      //    name: store.lists[listTwo].name,
      //    iconName: store.lists[listTwo].iconName,
      //    board: store.lists[listTwo].board,
      //    jobs: store[listTwo][jobs]
      //  },
      //  success: function(List){
      //
      //  }
      //});

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