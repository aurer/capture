module.exports = function ($) {
	var module = {
		init: function() {
			module.handleFormSubmit();
		},

		handleFormSubmit: function() {
			var captureForm = $('.Form--capture');
			var output = $('.Section--output .Section-inner');

			captureForm.on('submit', function(e){
				if (!module.validateForm()) {
					e.preventDefault();
					return;
				}
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

		validateForm: function() {
			var captureForm = $('.Form--capture');
			var page = captureForm[0].url;
			var width = captureForm[0].width;
			var height = captureForm[0].height;

			if (page.value == '') {
				alert('Please enter a valid URL');
				page.focus();
				return false;
			}

			if (width.value < 200) {
				alert('Please enter a width greater than 200');
				width.focus();
				return false;
			}

			if (height.value < 200) {
				alert('Please enter a height greater than 200');
				height.focus();
				return false;
			}

			return true;
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
