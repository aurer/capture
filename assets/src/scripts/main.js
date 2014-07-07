$(function(){
	
	$('a.btn').on('click', function(e){
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).data('opt') == 'set'){
			$('.opt-custom').addClass('inactive').find('input').attr('disabled', true);
		} else {
			$('.opt-custom').removeClass('inactive').find('input').attr('disabled', false);
		}
	});

	$('form.shot').submit(function(e){
		e.preventDefault();
		clearAllErrors();
		var form = $(this);
		var option = $('a[data-opt=custom]').hasClass('active') ? 'custom' : 'set';

		if (this.url.value == '') {
			addFieldError('input[name=url]', 'Please enter a valid URL');
			this.url.focus();
			return;
		};

		if(option == 'set'){
			var formdata = form.serialize();
			var sizes = ['320x600', '500x500', '700x520', '1280x800', '1400x1200'];

			var sizes = [
			    [320,568],
			    [600,1024],
			    [1024,768],
			    [1280,800],
			    [1440,900]
		    ]
			var counter = 0;

			$('.output .row').empty();
			function getImage(){
				var width = sizes[counter][0];
				var height = sizes[counter][1];
				var params = formdata + '&width=' + width + '&height=' + height;
				var imageurl = '/capture.php?' + params;

				var wrapper = $('<div />',{class: 'screenshot loading', width: width, height: height})
					.appendTo('.output .row');

				$('.output').animate({scrollTop: wrapper.offset().top}, 800);

				$('<img>', { src: imageurl, width: width }).appendTo(wrapper)
					.load(function(){
						$(this).parent().removeClass('loading');
						if(sizes[counter]){
							getImage();
						}
					})
					.error(function(){
						var imageContainer = $(this);
						imageContainer.parent().removeClass('loading').addClass('failed');
						imageContainer.parent().html('<p>There was a problem generating your screenshot.<br> Please make sure you entered a valid URL.</p>');
						imageContainer.remove();
					});
				counter++;
			}
			getImage();
		} else {

			if (this.width.value == '' || this.height.value == '') {
				addFieldError('input[name=width]', 'Please specify a width and height');
				this.width.focus();
				return;
			};
			$('.output .row').empty();
			var params = $(this).serialize();
			var width = this.width.value;
			var height = this.height.value;
			var imageurl = '/capture.php?' + params;
			var wrapper = $('<div />',{class: 'screenshot loading', width: width, height: height})
				.appendTo('.output .row');

			$('<img>', { src: imageurl, width: width }).appendTo(wrapper)
				.load(function(){
					$(this).parent().removeClass('loading');
				})
				.error(function(){
					$(this).parent().removeClass('loading');
				});

		}
	});
});

function addFieldError(selector, error){
	var field = $(selector);
	var container = field.parent();
	var err_ele = container.find('.error');
	var error_message = $('<span>', {class: 'error', text: error});

	if(err_ele.length){
		err_ele.text(error);
	} else {
		container.append(error_message);
	}
}

function removeFieldError(selector){
	$(selector).parent().find('.error').remove();
}

function clearAllErrors(){
	$('.field .error').remove();
}