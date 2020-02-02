$(document).ready(function() {
		
			$('.close').click(function() {
				var parent = $(this).context.parentNode;
				$(parent).fadeOut('fast');
			});
			
			$('#experience-btn').click(function() {
				$('.experience').fadeIn('fast');
			});
			
			$('#contact-btn').click(function() {
				$('#contact-form').show();
				$('#send-success').hide();
				$('.contact').fadeIn('fast');
			});
			
			$('#about-btn').click(function() {
				$('.about').fadeIn('fast');
			});
			
			$(document).keyup(function(e) {
  				if (e.keyCode == 27) {
  					if ($('.experience').is(':visible')) {
  						$('.experience').fadeOut('fast');
  					}
  					if ($('.contact').is(':visible')) {
  						$('.contact').fadeOut('fast');
  					}
  					if ($('.about').is(':visible')) {
  						$('.about').fadeOut('fast');
  					}
  				}   // escape key maps to keycode `27`
			});
			
			if (window.location.pathname == "/experience") {
				$('.experience').show();
 			}
			
			if (window.location.pathname == "/contact") {
				$('.contact').show();
			}
			
			if (window.location.pathname == "/about") {
				$('.about').show();
			}

/* --------------------------------
CONTACT FORM
-------------------------------- */

	//For Testing
	
// 	$('#sender_name').val("Amanda");
// 	$('#sender_email').val("Amanda.atkins@gmail.com");
// 	$('#sender_message').val("This is a message with some spaces.");
// 	$('#suck-it-bots').val("hot"); 
	
	
	$('#send-success').hide();

	$('#sender_name').click(function() { resetInput($('#sender_name')); });
	$('#sender_email').click(function() { resetInput($('#sender_email')); });
	$('#sender_message').click(function() { resetInput($('#sender_message')); });
	$('#suck-it-bots').click(function() { resetInput($('#suck-it-bots')); });

	function resetInput(thing) {
		thing.css({
			'border' : '1px solid #fff'
		});
	}

	$('#contactSubmit').click(function() {
	
		//sendSuccess();
	
		var name = $('#sender_name');
		var email = $('#sender_email').val();
		var message = $('#sender_message');
		var ughbots = $('#suck-it-bots');

		var send = 0;

		if (isEmail(email)) {
			send++;
		} else {
			$('#sender_email').css({'border' : '1px solid #f00'});
		}

		if (checkVal(name)) {
			send++;
		}
		
		if (checkVal(message)) {
			send++;
		}
		
		if (checkVal(ughbots)) {
			send++;
		} else {
			ughbots.css({'border' : '1px solid #f00'});
		}
	
		if (send == 4) {
			name = $('#sender_name').val();
			message = $('#sender_message').val();
			sendEmail(name,email,message);
		} else {
			$('#sent-success').hide();
		}
	});

	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	function checkVal(item) {
	
		var isBots = item[0].id;
	
		if (isBots === 'suck-it-bots') {
			console.log(item.val().toLowerCase());
			if (item.val().toLowerCase() == 'hot') {
				return true;
			} else {
				return false;
				console.log('false');
			}
		} else {
			var val = item.val();
		
			if (val == '') {
				item.css({'border' : '1px solid #f00'});
				return false;
			} else {
				return true;
			}
		}
	}

	function getAjax() {
		try {
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				try {
					return new ActiveXObject('Msxml2.XMLHTTP');
				} catch (try_again) {
					return new ActiveXObject('Microsoft.XMLHTTP');
				}
			}
		} catch (fail) {
			return null;
		}
	}

	function sendEmail(name,email,message) {
		 var rq = getAjax();
		 
		 var to = "amanda@digitalrainstorm.com";

		 if (rq) {
			 // Success; attempt to use an Ajax request to a PHP script to send the e-mail
			 try {
			 	
			 	var url = 'scripts/sendemail.php?email=' + encodeURIComponent(email) + '&message=' + encodeURIComponent(message) + '&name=' + encodeURIComponent(name);

				rq.open('GET', url, true);

				rq.onreadystatechange = function () {
					if (this.readyState === 4) {
						if (this.status >= 400) {
							// The request failed; fall back to e-mail client
							window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
						}
					}
				};

				rq.send(null);
				
				sendSuccess();
				
			} catch (fail) {
				// Failed to open the request; fall back to e-mail client
				window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
			}
		} else {
			// Failed to create the request; fall back to e-mail client
			window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
		}
	}
	
	function sendSuccess() {
		$('#contact-form').hide();
		$('#send-success').fadeIn("fast").delay(2000);
		$('.contact').delay(1000).fadeOut('fast');
		$('#sender_name').val("");
		$('#sender_email').val("");
		$('#sender_message').val("");
		$('#suck-it-bots').val("");		
		
		resetInput($('#sender_name'));
		resetInput($('#sender_email'));
		resetInput($('#sender_message'));
		resetInput($('#suck-it-bots'));
		
	}

});