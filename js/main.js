$(window).ready(function() {

	$('.js-lang-btn').click(function() {
		$('.js-lang-container').toggleClass("Lang-open");
	});

	$('.js-dropdown').click(function() {
		$(this).parent().toggleClass("open");
	});

	$('.js-nav-dropdown').click(function() {
		$('.js-nav-dropdown-container').toggleClass("open");
	});

	$('.js-carousel').slick({
		slidesToShow: 1,
		arrows: true,
		dots: true,
		adaptiveHeight: true,
		centerPadding: '40px'
	})

	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false
	};

	$.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

	$('.js-in-date').datepicker();

	$('.js-in-count').spinner({
		spin: function( event, ui ) {
			if ( ui.value > 99 ) {
				$( this ).spinner( "value", 0 );
				return false;
			} else if ( ui.value < 0 ) {
				$( this ).spinner( "value", 99 );
				return false;
			}
		}
	});

	

	$('.js-popup-close').click(function() {
		$.magnificPopup.close();
	});

	$('.js-open-form').click(function() {
		$.magnificPopup.open({
			items: {
				src: '#form'
			},
			type: 'inline'

			// You may add options here, they're exactly the same as for $.fn.magnificPopup call
			// Note that some settings that rely on click event (like disableOn or midClick) will not work here
		}, 0);
	})

	$('.js-in-phone').mask("+7 (999) 999-99-99");


	$('form').ajaxForm({
		url: "index.html",
		method: "POST",
		beforeSubmit: function(data, $form) {
			var $name = $form.find(".js-in-name"),
				$phone = $form.find(".js-in-phone"),
				$mail = $form.find(".js-in-mail");
			
			printValid($name);
			printValid($phone);
			printValid($mail);

			if( ! (valid($name) && valid($phone) && valid($mail)) ) {
				return false;
			} else {
				$.magnificPopup.open({
					items: {
						src: "#success"
					},
					type: "inline"
				}, 0);

				$form.trigger('reset');

				yaCounter36798385.reachGoal('form');
				
				return false;
			}
		},

		success: function(responseText, statusText, xhr, $form) {
			//$.magnificPopup.close();
			
		}

	});
});

function valid ($input) {
	if($input.attr('name') == 'mail') {
		var reg = /.+@.+\..+/i;

		if(!~$input.val().search(reg)) {
			return false;
		}

		return true
	}

	if($input.val().length > 2) {
		return true;
	}

	return false;
}

function printValid($input) {

	if(valid($input)) {
		$input.removeClass("invalid");
	} else {
		$input.addClass("invalid");
	}
}