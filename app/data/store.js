var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ColorThief = require('../color-thief.js');
// var mockInitialState = require('./mockData_getInitialState')

// THIS IS OUR GLOBAL STATE
// ========================

var store = {
    user: {},
    lists:[],
    creatingNewJob: false,          // true when the new job popup is visible
    creatingNewJobForList: null,
    viewingJob: false,              // true when the job details popup is visible
    viewingJobId: null,
    searchingMessages: true,       // true when the new job popup is visible, and we are searching messages
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
  setViewingJob: function(value,jobId) {
    store.creatingNewJob = false;
    store.creatingNewJobForList = null;
    store.viewingJob = value;
    store.viewingJobId = jobId;
    this.emitChange();
  },

  setCreatingNewJob: function(value,listId) {
    store.viewingJob = false;
    store.viewingJobId = null;
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
    var idx;
    for (idx in store.lists) {
      var list = store.lists[idx];
      var jidx;
      for (jidx in list.jobs) {
        var job = list.jobs[jidx];
        if (job._id == jobId) {
          return job;
        }
      }
    }
    return null;
  },

  getJobs: function(listId) {
    return store.users;
  },

  addJob: function(listId,newcompany,positionTitle) {

    var sendJobInfo = function(rgbColor,logoUrl,hasALogo) {
      var promise = new Promise(function(resolve,reject) {
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/api/company",
          data: {
            hasLogo:          hasALogo,
            name:             newcompany.name,
            website:          newcompany.website,
            logoUrl:          logoUrl,
            hexColor:         'rgba(' + rgbColor[0] + "," + rgbColor[1] + "," + rgbColor[2] + ",0.85)",
            glassdoorId:      newcompany.id,
            numberOfRatings:  newcompany.numberOfRatings,
            industry:         newcompany.industry,
            website:          newcompany.website,
            overallRating:    newcompany.overallRating,
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
    }.bind(this);

    if (newcompany.website && newcompany.website != "") {
      var logoUrl = "https://logo.clearbit.com/" + newcompany.website;

      $.ajax({
        url: logoUrl,
        success: function() {
          // Code for getting color from company logo
          var canvas  = document.createElement('canvas');
          var ctx     = canvas.getContext("2d");
          var image   = document.createElement('img');

          image.style.display   = 'none';
          canvas.style.display  = 'none';

          image.onload = function(){
            ctx.drawImage(image,10,10);
            var colorThief  = new ColorThief();
            var rgbColor    = colorThief.getColor(canvas);
            console.log("Found color");
            console.log(rgbColor);
            // Now that we have all the info we need,
            // send out the updates to the server
            image.parentNode.removeChild(image);
            canvas.parentNode.removeChild(canvas);
            sendJobInfo(rgbColor,logoUrl,true);
          }.bind(this);

          console.log("This is the company logo url" + logoUrl);
          document.body.appendChild(canvas);
          document.body.appendChild(image);
          image.crossOrigin = "Anonymous";
          image.src=logoUrl;
        },
        error: function(r,x) {
          console.log(r);
          sendJobInfo([174,174,174],"/images/nologo.png",false);
        }
      });
    } else {
      sendJobInfo([174,174,174],"/images/nologo.png",false);
    }
  },
  updateJobsRemove: function(listObj, jobIdToRmv){
    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/api/list",
      data: {
        list_id: listObj.list_id,
        name: listObj.name,
        iconName: listObj.iconName,
        board: listObj.board,
        job: null,
        jobRmv: jobIdToRmv,
        index1: listObj.index1,
        index2: listObj.index2,
        index3: listObj.index3
      },
      success: function(list){
        list
      }
    });
  },
  updateJobsAdd: function(jobObj, listObject, jobRmv) {
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
            company: jobObj.company,
            messages: jobObj.messages
          },
          listObject: listObject,
          jobRmv: jobRmv,
          success: function (job) {
            var listObj = this.listObject;
            var rmvJob = this.jobRmv;
            var jobId = job._id;
            $.ajax({
              type: "PUT",
              url: "http://localhost:3000/api/list",
              data: {
                list_id: listObj.list_id,
                name: listObj.name,
                iconName: listObj.iconName,
                board: listObj.board,
                job: jobId,
                jobRmv: rmvJob,
                index1: listObj.index1,
                index2: listObj.index2,
                index3: listObj.index3
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
      this.updateJobsRemove(listObject, jobRmv);
    }
  },
  updateJobsOrder: function(listObj) {
    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/api/list",
      data: {
        list_id: listObj.list_id,
        name: listObj.name,
        iconName: listObj.iconName,
        board: listObj.board,
        job: null,
        jobRmv: null,
        index1: listObj.index1,
        index2: listObj.index2,
        index3: listObj.index3
      },
      success: function (list) {
        list
      }
    });
  },
  moveCard: function(indexOne,listOne,indexTwo,listTwo) {
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
        jobs: list_1.jobs,
        index1: indexOne,
        index2: indexTwo,
        index3: indexTwo + 1
      };
      var list_2Obj = {
        list_id: list_2._id,
        name: list_2.name,
        iconName: list_2.iconName,
        board: list_2.board,
        jobs: list_2.jobs,
        index1: indexOne,
        index2: indexTwo,
        index3: indexTwo + 1
      };
      var jobObj = {
        job_id: tempJob._id,
        jobTitle: tempJob.jobTitle,
        cities: tempJob.cities,
        newLstId: list_2._id,
        company: tempJob.company._id,
        messages: tempJob.messages
      };
      this.updateJobsAdd(null, list_1Obj, tempJob._id);
      this.updateJobsAdd(jobObj, list_2Obj, null);

    } else {
      // if moving from bellow up move jobs down
      var tempJob = store.lists[listOne]["jobs"][indexOne];
      if(indexOne > indexTwo){
        store.lists[listOne]["jobs"].splice(indexOne, 1);
        store.lists[listOne]["jobs"].splice(indexTwo, 0, tempJob);
      }
      //else if moving from above down move jobs up
      else{
        store.lists[listOne]["jobs"].splice(indexTwo + 1, 0, tempJob);
        store.lists[listOne]["jobs"].splice(indexOne, 1);
      }
      var list_1 = store.lists[listOne];
      var list_1Obj = {
        list_id: list_1._id,
        name: list_1.name,
        iconName: list_1.iconName,
        board: list_1.board,
        index1: indexOne,
        index2: indexTwo,
        index3: indexTwo + 1
      };
      this.updateJobsOrder(list_1Obj)
    }
    this.emitChange();
  },
  updateJob: function(id, updates) {
  },
  removeJob: function(jobId,listIdx) {
    $.ajax({
      type: "DELETE",
      url: "http://localhost:3000/api/job",
      data: { jobId: jobId },
      success: function(response) {
        var list = store.lists[listIdx];
        var idx;
        for (idx in list.jobs) {
          var job = list.jobs[idx];
          if (job._id == jobId) {
            store.lists[listIdx]["jobs"].splice(idx,1);
            this.emitChange();
            break;
          };
        };
      }.bind(this)
    });
  },

  // User
  // =======================
  setUser: function(user) {
    store.user = user;
  },

  getUser: function() {
    return store.user;
  },

  /**
   * obtains the users refresh token and uses the refresh token to obtain
   * the users acess token from the google api
   * @param id: the _id for the user defined by mongodb
   * @returns {Promise|*} an access token promise obtain from GoogleApi
   *
   */
  getNewToken: function(id){
    var refreshToken = new Promise(function(resolve, reject){
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/user",
        data: { id: id },
        success: function(response) {
          response
          resolve(response.refreshToken)
        }
      });
    });
    return refreshToken.then(function(refreshToken){
      var newToken = new Promise(function(resolve, reject){
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/googleToken",
          data: { refreshToken: refreshToken},
          success: function(response) {
            resolve(response)
          }
        });
      });
      return newToken.then(function (newTokeObj) {

        return newTokeObj.token;

      })
    });

  },
  
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


module.exports = Store;