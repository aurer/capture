var jquery = require('jquery');
var capture = require('./capture.js')(jquery);
var fonts = require('./fonts.js');

jquery(function($){
	capture.init();
	fonts.add('Lato:100,400,700:latin').load();
}(jquery));
