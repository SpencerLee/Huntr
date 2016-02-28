var express = require('express');
var router = express.Router();
var Board = require('../models/Board');
var Activity = require('../models/Activity');
var List = require('../models/boardlist');
var City = require('../models/City');
var Job = require('../models/Job');
var User = require('../models/User');
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

/* Delete all documents in all models */
router.delete('/DeleteAll', function(req,res,next){
	Board.delete({});
	Activity.delete({});
	List.delete({});
	City.delete({});
	Job.delete({});
	User.delete({});
});


/* POST  new user info: name, email, username, password */
router.post('/user', function(req,res,next){
	var newUser =  new User({"name": req.body.name, "userName": req.body.userName, "email": req.body.email, "passWord": req.body.password});
	newUser.save(function(err){
		if(err){
			console.log(err);
		}
	});

	Board.create({user: newUser._id}, function(err, board){
		if(err) console.log(err);
		if(board) console.log("board userId: " + board.user);
	});
	res.send("added user: " + newUser.name + " with email: " + newUser.email);
});



/* DASHBOARD REQUESTS */

/* initial GET dashboard info with board, lists, jobs for a given userId */
router.get('/dashboard/:userId', function(req,res,next){
	var userId = req.params.userId;
	if(checkUserExists(userId)){
		res.send(constructDashboard(userId));
	}
	

});

/* GET job info */
router.get('/job', function(req,res,next){
	var jid = req.query.jobid;
	console.log(jid);
	if(jid == "12345"){
		res.send({title: "Jr. Software Developer", company: "Google", location: "Paolo Alto, California"});
	}
	else{
		res.send("invalid job Id");
	}
		

});

/* HELPER FUNCTIONS */

function constructDashboard(userId){
	if(checkUserExists(userId)){

	}

	return completeBoard;
}




function checkUserExists(userId){
	return user.find({"_id": ObjectId(userId)}).limit(1).size() > 0;
}




function getListsForBoard(boardId){
	return 
}

function getCardsForList(listId){
	return card.find({"_id": ObjectId(listId)})
}





module.exports = router;