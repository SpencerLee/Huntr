var express = require('express');
var router = express.Router();


/* GET users info. */
router.get('/users', function(req, res, next) {
  res.send( {name: "Spencer", email: "spencerlee1990@gmail.com"});
});


/* POST  new user info: name, email, username, password */
router.post('/users', function(req,res,next){
	res.send("added user: " + req.body.name + " with email: " + req.body.email);
});

/* initial GET dashboard info with board, lists, jobs for a given userId */
router.get('/dashboard/:userId', function(req,res,next){
	var userId = req.params.userId;
	if(userId == "Spencer"){
		res.send(constructDashboard("1343"));
	}
	else{
		res.send("invalid userId");
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


function constructDashboard(userId){
	return({username: "Spencer", 
		    board:
		    	{ boardId: "12345", 
		    	  lists: 
		    	  	{ listId: "2343", 
		    	  	cards: 
		    	  		{cardId: "23", 
		    	  			job: 
		    	  				{jobId: "1", title:"job title", company: "Google", location: "here"}
    	  			} 
    	  		}
    	  	}
  	});
}
















module.exports = router;