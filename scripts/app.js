$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// backgrounds
	var backgrounds = {
			b1 : $('#background-1'),
			b2 : $('#background-2'),
			b3 : $('#background-3')
		},
		contents = {
			c1 : $('#content-1'),
			c2 : $('#content-3'),
			c3 : $('#content-5')
		};

	on_resize(function() {
		console.log('i fired');
		if(window.innerWidth < 850){
			backgrounds.b1.height(contents.c1.outerHeight()).css('background-size','auto 100%');
			backgrounds.b2.height(contents.c2.outerHeight()).css('top',contents.c2.position().top);
			backgrounds.b3.height(contents.c3.outerHeight()).css('top',contents.c3.position().top);
		} else {
			backgrounds.b1.attr('style','');
			backgrounds.b2.attr('style','');
			backgrounds.b3.attr('style','');
		}
	})();

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};
