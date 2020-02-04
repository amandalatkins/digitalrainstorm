$(document).foundation();

$(window).on('load', function() {
	$(".se-pre-con").fadeOut("slow");
});

$(document).ready(function() {

	$("#rotating-services").Morphext({
	    // The [in] animation type. Refer to Animate.css for a list of available animations.
	    animation: "fadeInDown",
	    // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
	    separator: ",",
	    // The delay between the changing of each phrase in milliseconds.
	    speed: 3000,
	    complete: function () {
	        // Called after the entrance animation is executed.
	    }
	});

	var navDistance;

	var mobileToggle = $('.mobile-nav-toggle'),
	mobileNav = $('.mobile-nav'),
	navContainer = $('.nav-container'),
	$window = $(window),
	footer = $('footer'),
	honey = $('#honeypot');

	// Mobile Nav Toggle Open and Close Action

	mobileToggle.click(function() {
		if (mobileToggle.hasClass('active')) {
			mobileNav.slideUp('fast');
			mobileToggle.removeClass('active');
		} else {
			mobileNav.slideDown('fast');
			mobileToggle.addClass('active');
		}
	});

	// Nav bar sticking to top

	$window.scroll(function() {
		if (!$('.nav-container.top-fixed').length) {
			navPlacement($window, navContainer, navDistance);
		}
	});

	if (!$('.nav-container.top-fixed').length) {
		setDistances(navContainer);
	}

	function setDistances(navBar) {
		navDistance = navBar.offset().top;
	}

	function navPlacement($window, nav, distance) {
		if ($window.scrollTop() >= distance) {
			if (!nav.hasClass('top-fixed')) {
				nav.addClass('top-fixed');
				$('section:first-of-type').css('margin-top', nav.height()*2 + "px");
			}
		}
		if ($window.scrollTop() <= distance) {
			if (nav.hasClass('top-fixed')) {
				nav.removeClass('top-fixed');
				$('section:first-of-type').css('margin-top', '0');
			}
		}
	}

	// Hash links doing their thang

	$('.scroll-dongle').click(function(e) {
		e.preventDefault();
		var position = navContainer.offset().top;
		$('html, body').animate({
			scrollTop: position
		  }, 1000, function(){
		});
	});

	$('.contact-link').click(function(e) {
		e.preventDefault();
		var position = footer.offset().top;
		$('html, body').animate({
			scrollTop: position
		}, 1000,function() {});
	});

	//Contact script

	$('#contactForm').submit(function(e) {
		e.preventDefault();
		if (!$('#honeypot input').prop('checked')) {

			$('body').css('cursor','wait');

			var dataObj = {
				name: $('#yourName').val().trim(),
				email: $('#yourEmail').val().trim(),
				phone: $('#yourPhone').val().trim(),
				website : $('#yourSite').val().trim(),
				message: $('#yourMessage').val().trim(),
				to: "amanda@digitalrainstorm.com"
			};
			$.ajax({
				type: "POST",
				data: dataObj,
				url: "/api/email"
			}).then(success => {
				$('body').css('cursor','default');
				$('.email-response').append('Thank you! Your email was sent. I\'ll be in touch soon!');
				$('#contactForm')[0].reset();
			});
		}
	});

});