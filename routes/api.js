var express = require('express');
var router = express.Router();
var Board = require('../models/Board');
var Activity = require('../models/Activity');
var List = require('../models/boardlist');
var City = require('../models/City');
var Job = require('../models/Job');
var User = require('../models/User');
var Compnay = require('../models/Company');
var mongoose = require('mongoose');

/* USER REQUESTS */


/* GET users info by email. */
router.get('/user', function(req, res, next) {
	User.findOne({"email": req.query.email}, "_id email name userName passWord", function (err, user) {
  	if (err) console.log(err);
  	if(user){
  	userObj = user;
	  	
	  	res.send( {userId: userObj._id, name: userObj.name, email: userObj.email, userName: userObj.userName})
  	}
  	else{
  		res.send({errorCode: 900, errorMessage: "Cannot find user for email "+req.query.email});
  	}
  });
  
	
	
});


/* POST  new user info: name, email, username, password */
router.post('/user', function(req,res,next){
	var newUser =  new User({"name": req.body.name, "userName": req.body.userName, "email": req.body.email, "passWord": req.body.password});
	newUser.save(function(err){
		if(err){
			console.log(err);
		}
		if(newUser) {
			console.log("userId: " + newUser._id);
			Board.create({user: newUser._id}, function(err, board){
				if(err) console.log(err);
				if(board) {
					console.log("new userId: " + board.user);
					console.log("boardId: " + board._id);
				}
			});
		}

	});


	res.send("added user: " + newUser.name + " with email: " + newUser.email);
});


router.get("/board", function(req,res,next){
	Board.findOne({_id: req.query.userId}, function(err, board){
		if(err) console.log(err);
		if(board){
			console.log(board);
		}
		else{ console.log("could not find board");
		}
	});
	res.send('blurp');
});


/* DASHBOARD REQUESTS */

/* initial GET dashboard info with board, lists, jobs for a given userId */
router.get('/dashboard/:userId', function(req,res,next){
	// console.log("GET dashboard");
	 var userId = req.params.userId;
	// console.log(userId);
	// var userExists = false;
	// console.log(userExists);

	// var dash = constructDashboard(userId);
	// console.log("dash: " + dash);
	// res.send(dash);
	var dash;

	Board.find({"_id": userId}, function(err, board){
		
		if(err) return handleError(err);
		if(board){
			
			// lists = getListsForBoard(board._id);
			// console.log({boardId: board._id, lists: lists});
			// return {boardId: board._id, lists: lists};

			List.findOne({"board": board._id}, function(err,lists){
				if(err) return handleError(err);
				if(lists){
					console.log(lists);
					var completeLists = [];
					//for(var list in lists){
						//console.log("getting jobs for: " + list.name);
						Job.find({"list": lists._id}, function(err,jobs){
							if(err) return handleError(err);
							if(jobs){
								 console.log(jobs);
								completeLists.push({_id: lists._id, name: lists.name, icon_url: lists.icon_url, jobs: jobs});
							
								dash = {boardId: board._id, lists: completeLists};
								res.send(dash);
							}
						})
						
					//}
					
				}
			})
		}
	})
	
});



/* GET job info */
router.get('/job', function(req,res,next){
	
});


/* Delete all documents in all models */
router.delete('/DeleteAll', function(req,res,next){
	Board.remove({});
	Activity.remove({});
	List.remove({});
	City.remove({});
	Job.remove({});
	User.remove({});
});



/* HELPER FUNCTIONS */







router.post("/list", function(req,res,next){
	List.create({name: req.body.name, iconName: req.body.iconName, board: req.body.boardId}, function(err,list){
		if(err) console.log(err);
		if(list) console.log(list);
		res.send(list);
	});

});



router.post("/company", function(req,res,next){
	Company.create({name: req.body.name, logoUrl: req.body.logoUrl, hexColor: req.body.hexColor, glassdoorId: req.body.glassdoorId, 
				 glassdoorKey: req.body.glassdoorKey, location: req.body.location}, function(err,company){
		if(err) console.log(err);
		if(company) console.log(company);
		res.send(company);
	});

});

router.post("/job", function(req,res,next){
	Job.create({"jobTitle": req.body.jobTitle, "cities": req.body.cities, "list": req.body.list, "company": req.body.company}, function(err,job){
		if(err) console.log(err);
		if(job) console.log(job.jobTitle);
		res.send(job);
	});

});






module.exports = router;