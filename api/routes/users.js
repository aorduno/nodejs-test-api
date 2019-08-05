var express = require('express');
var router = express.Router();
const usersRepo = require('../db/dbUsers');

// @TODO:aorduno -- implement a middle tier which takes the raw HTTP RQs and sanitize,transforms,whatever as usersRepo expects it
// it would also be nice to have ResponseClasses for each endpoint so we have more control and better documentation on them...
router.get('/', function(req, res, next) {
	let responseData = {error: null, users: []};
	console.log('GET USERS RQ');
	console.log(req.query);
	usersRepo.findUsers(req.query.id)
	.then(data => {
		console.log('Succeded!');
		responseData.users = data
		return res.send(responseData);
	})
	.catch(e => {
		console.log('Failed!');
		next(e);
	});
});

router.post('/', function(req, res) {
	let responseData = {error: null, data: {inserted: 0}};
	console.log('USER POST!');
	console.log(req.body);
	usersRepo.insertUser(req.body)
	.then(result => {
		responseData.data.inserted = result;
		return res.send(responseData);
	})
	.catch(e => {
		console.log('User POST failed for RQ');
		console.log(req.body);
		next(e);
	});
});

router.put('/:userId', function(req, res, next) {
	console.log('Got User UPDATE Request. Params:');
	console.log(req.params);
	let responseData = {error: null, data: {matchedCount: 0, modifiedCount: 0}};
	const userCriteria = {
		userId: req.params.userId
	};


	usersRepo.updateUser(userCriteria, req.body)
	.then(result => {
		responseData.data.matchedCount = result.matchedCount;
		responseData.data.modifiedCount = result.modifiedCount;
		return res.send(responseData);
	})
	.catch(e => {
		console.log('User PUT failed for RQ');
		console.log(req.params);
		next(e);
	});
});

router.delete('/:userId', function(req, res, next) {
	console.log('Got User DELETE Request. Params:');
	console.log(req.params);
	let responseData = {error: null, data: {deleted: 0}};
	usersRepo.deleteUser(req.params)
	.then(result => {
		responseData.data.deleted = result.result.n;
		return res.send(responseData);
	})
	.catch(e => {
		console.log('User DELETE failed for RQ');
		console.log(req.params);
		next(e);
	});
});

module.exports = router;
