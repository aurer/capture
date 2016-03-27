module.exports = function($) {
	var jqueryValidation = require('jquery-validation');

	var module = {
		init: function() {
			module.handleFormSubmit();
		},

		handleFormSubmit: function() {
			var captureForm = $('.Form--capture');
			var output = $('.Section--output .Section-inner');

			captureForm.on('submit', function(e){
				captureForm.validate();
				var $this = $(this);
				var page = this.url.value;
				var width = this.width.value;
				var height = this.height.value;
				var url = '/render?' + $this.serialize();
				output.html('');
				module.renderScreenshot(output, url, page, width, height);
				e.preventDefault();
			});
		},

		renderScreenshot: function(container, src, caption, width, height) {
			var figure = $('<figure>', {
				class: 'Screenshot is-loading',
			});

			var caption = $('<figcaption>',{
				class: 'Screenshot-caption',
				text: caption
			});

			var image = $('<img>', {
				class: 'Screenshot-image',
				src: src,
			}).on('load', function(e){
				figure.css({
					width: width,
					height: height
				});
				figure.removeClass('is-loading');
			}).on('error', function(){
				return container.html("<p>Sorry we couldn't generate a screenshot for that URL</p>");
			});

			figure.append(caption);
			figure.append(image);
			container.append(figure);
		}
	}

	return module;
};
