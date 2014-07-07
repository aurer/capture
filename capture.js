// Setup variables
var page = require('webpage').create(),
	system = require('system'),
	url = system.args[1],
	filepath = system.args[2],
	width = system.args[3] || 980,
	height = system.args[4] || 3000,
	format = system.args[5] || 'jpeg',
	quality = system.args[6] || 90;


// Setup page 
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36';
page.zoomFactor = 1;
page.viewportSize = { height:height, width:width };

// Open and render
page.open(url);
page.onLoadFinished = function(status){
	if (status === 'success') {
		setTimeout(function(){
			page.render(filepath, {format: format, quality: quality});
			page.release();
			phantom.exit();
		}, 500);
	} else {
		console.log('Unable to access the network!');
		page.release();
		phantom.exit();
	}
}