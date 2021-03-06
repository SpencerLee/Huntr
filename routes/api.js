var express 				= require('express');
var router 					= express.Router();
var Board 					= require('../models/board');
var Activity 				= require('../models/activity');
var List 						= require('../models/boardlist');
var City 						= require('../models/city');
var Job 						= require('../models/job');
var Company 				= require('../models/company');
var fs      				= require('fs');
var request 				= require('request');
var path 						= require('path');
var appDir 					= path.dirname(require.main.filename);
var User 						= require('../models/user');

/* RESPONSE CODES */

var CODES 	= {
	SUCCESS: 200,
	ERROR: 404,
};

/* USER REQUESTS */
// =====================

/* GET users info by email. */
router.get('/user', function(req, res, next) {
	User.findById(req.query.id, function (err, user) {
		console.log(req.query.id);
	  if (err) {
			console.log(err);
			return next(err);
		}
	  if (user) {
	  		res.send(user);
  	} else {
  		res.send({errorCode: 900, errorMessage: "Cannot find user for email " + req.query.email});
  	}
  });
});

router.get("/board", function(req,res,next){
	console.log(req.query.userId);
	Board.findOne({user: req.query.userId}, function(err, board){
		if(err){
			console.log(err);
			return next(err);
		}
		if(board){
			console.log(board);
			res.send(board);
		}
		else{ 
			console.log("could not find board");
			res.send("we're closed");
		}
	});
	
});

/* Initial Dashboard Request */
//===============================

router.get('/dashboard', isLoggedIn, function(req,res,next){
	Board.findOne({"user": req.user._id}).deepPopulate('lists.jobs.company').exec(function (err, board) {
		if(err){
			console.log(err);
			return next(err);
		}
		if(board){
			res.send(board);
		}
	});
});

/* Delete all documents in all models */
router.delete('/DeleteAll', function(req,res,next){
	Board.remove({},function(err){
		console.log("deleted Board colleciton");
	});
	Activity.remove({},function(err){
		console.log("deleted Activity colleciton");
	});
	List.remove({},function(err){
		console.log("deleted List colleciton");
	});
	City.remove({},function(err){
		console.log("deleted City colleciton");
	});
	Job.remove({},function(err){
		console.log("deleted Job colleciton");
	});
	User.remove({},function(err){
		console.log("deleted User colleciton");
	});
	res.send("congratulations you've deleted everything");
});

// User
// =====================

/* POST  new user info: name, email, username, password */
router.post('/user', function(req,res,next){
	var newUser =  new User({"name": req.body.name, "userName": req.body.userName, "email": req.body.email, "passWord": req.body.password});
	newUser.save(function(err){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(newUser) {
			console.log("userId: " + newUser._id);
			Board.create({user: newUser._id}, function(err, board){
				if(err) return handleError(err);
				if(board) {
					console.log("new userId: " + board.user);
					console.log("boardId: " + board._id);
				}
			});
		}

	});
	res.send(newUser);
});



/* GET users info by email. */
router.get('/user', function(req, res, next) {
	User.findOne({"email": req.query.email}, "_id email name userName passWord", function (err, user) {
	  	if(err) {
				console.log(err);
				return next(err);
			}
	  	if(user){
	  		res.send(user);
  	}
  	else{
  		res.send({errorCode: 900, errorMessage: "Cannot find user for email "+req.query.email});
  	}
  });
  
	
	
});

// Board
// ====================

/* POST a new board with given userId */
router.post('/board', function(req,res,next){
	Board.create({user: req.body.userId}, function(err,board){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(board){
			res.send(board);
		}
	})
});

/* GET board given boardId*/
router.get("/board", function(req,res,next){
	Board.findOne({_id: req.query.boardId}, function(err, board){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(board){
			console.log(board);
			res.send(board);
		}
		else{ 
			console.log("could not find board");
			res.send("we're closed");
		}
	});
});

// List
// ======================

/*  POST a new list with given parameters */
router.post("/list", function(req,res,next){
	console.log(req.body);
	List.create({name: req.body.name, iconName: req.body.iconName, board: req.body.board}, function(err,list){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(list) {
			console.log(list);
			res.send(list);
		}
	});
});

/* GET a list by listId */
router.get("/list", function(req,res,next){

	List.findOne({_id: req.query.listId}, function(err,list){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(list){
			console.log(list);
			res.send(list);
		}
		else{
			res.send("900");
		}
	});

});
/**
 * updates a list with a body
 */
router.put("/list", function(req, res, next){
	List.findById(req.body.list_id, function(err, list){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(list){
			list.name = req.body.name;
			list.iconName = req.body.iconName;
			list.board = req.body.board;
			list.setJobs(req.body.job, req.body.jobRmv,
				req.body.index1, req.body.index2, req.body.index3);
			list.save(function(err){
				if(err) res.send(err);
				res.send(list);
			});
		}
		else{
			res.send("900")
		}
	})
});

/* DELETE a list with a given listId */
router.delete("/list",function(req,res,next){
	List.remove({_id: req.body.listId}, function(err){
		if(err) {
			console.log(err);
			return next(err);
		}
		res.send("removed lists with no name");
	})
});

// Company
// =====================

/* POST a new compnay with given parameters */
router.post("/company", function(req,res,next){

	console.log(req.body);
	var newCompany = {
		"name": req.body.name, 
		"logoUrl": req.body.logoUrl, 
		"hexColor": req.body.hexColor, 
		"glassdoorId": req.body.glassdoorId, 
		"location": req.body.location,
		"numberOfRatings": req.body.numberOfRatings,
		"overallRating": req.body.overallRating,
		"website": req.body.website,
		"industry": req.body.industry,
	};

	Company.update({ glassdoorId: req.body.glassdoorId}, newCompany, {upsert: true}, function(err, company) {
		if(err) {
			console.log(err);
			return next(err);
		};
		Company.findOne({glassdoorId: req.body.glassdoorId}, function(err,company) {
			if (req.body.hasLogo != "false") {
				var filePath = "public/company_logo_" + company._id + ".png";
				request(company.logoUrl).on('error', function(err) { console.log(err) }).pipe(fs.createWriteStream(filePath));
	      console.log("The file was saved!");
			};
			console.log(company);
			res.send(company);
		});
	});

});


/* GET a company with a given companyId */
router.get('/company', function(req,res,next){
	Company.find({_id: req.query.companyId}, function(err, company){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(company){
			console.log(company);
			res.send(company);
		}
	})
});

// Job
// =====================


/* POST a new job with given parameters */
router.post("/job", function(req,res,next){
	var job = new Job({"messages":[], "jobTitle": req.body.jobTitle, "cities": req.body.cities, "list": req.body.list, "company": req.body.company});
	List.findOne({_id:req.body.list}, function(err,list) {
		if (err) {
			console.log(err);
			return next(err);
		}
		if (list) {
			list.jobs.push(job);
			list.save(function(err, list) {
				job.save(function(err,job){
					if(err) console.log(err);
					if(job){ res.send(job);}
				});
			});
		};
	});
});

/* GET a job with a given jobId */
router.get('/job', function(req,res,next){
	Job.find({_id: req.query.jobId}, function(err, job){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(job){
			console.log(job);
			res.send(job);
		}
	})
});
/**
 * updates a job
 */
router.put('/job',function(req,res,next){
	Job.findById(req.body.job_id, function(err, job){
		if(err) {
			console.log(err);
			return next(err);
		}
		if(job){
			job.title = req.body.jobTitle;
			job.cities = req.body.cities;
			job.list = req.body.list;
			job.company = req.body.company;
			job.setMessages(req.body.messages);
			job.save(function(err){
				if(err) res.send(err);
				res.send(job);
			});
		}
		else{
			res.send("900");
		}
	})
});

/* DELETE a job with a given jobId */
router.delete('/job', function(req,res,next){
	Job.findOne({_id: req.body.jobId}, function(err, job) {
		job.remove(function(err) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.send({code: CODES.SUCCESS});
		});
	});
});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;