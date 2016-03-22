var jquery = require('jquery');
var app = require('./app.js')(jquery);

jquery(function($){
	app.init();
}(jquery));
