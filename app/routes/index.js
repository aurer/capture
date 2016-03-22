var express = require('express');
var router = express.Router();
var htmlEntities = require('html-entities').AllHtmlEntities;
var entities = new htmlEntities();
var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var md5 = require("nodejs-md5");

// Homepage
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Express',
  	message: req.session.message,
  	req: req
  });
});

// Render a screenshot
router.get('/render', function(req, res, next) {
	req.session.input = req.query;
	if (!req.query.url || req.query.url == '') {
		req.session.message = 'Please specify a url';
		return res.redirect('/');
	}

	if (!req.query.width || req.query.width < 200) {
		req.session.message = 'Please specify a width greater than 200';
		return res.redirect('/');
	}

	if (!req.query.height || req.query.height < 200) {
		req.session.message = 'Please specify a height greater than 200';
		return res.redirect('/');
	}

	// Build parameters
	var url = 'http://' + entities.encode(req.query.url).replace('http://', '');
	var width = req.query.width;
	var height = req.query.height;
	var refresh = req.query.refresh == 'true' ? true : false;
	var basePath = path.join(__dirname, '/..');
	var filename = md5.string.quiet(url + width + height) + '.jpg';
	var fullFilePath = basePath + '/screenshots/' + filename;
	var quality = 90;

	// Build phantomjs arguments
	var args = [
	  path.join(basePath, 'phantom-capture.js'),
	  url,
	  fullFilePath,
	  width,
	  height,
	  quality
	];

	// Return existing screenshot or generate a new one
	fs.exists(fullFilePath, function(exists){
		if (!refresh && exists) {
			console.log('Return cached screenshot for ' + url);
			fs.readFile(fullFilePath, function(err, data){
				res.type('image/jpeg');
				res.send(data);
			});
		} else {
			console.log('Generate screenshot for ' + url);
			childProcess.execFile(phantomjs.path, args, function(err, stdout, stderr) {
				if (err) {
					console.log('Error generating screenshot for ' + url);
					console.log(err);
					console.log(stderr);
					res.status(err.status || 500);
			    res.render('error', {
			      message: "Sorry we couldn't generate a screenshot for '" + url + "'",
			      error: err
			    });
			    return
				}
			  fs.readFile(fullFilePath, function(err, data){
					res.set('Content-Type', 'image/jpeg');
					res.send(data);
				});
			});
		}
	});
});

module.exports = router;
