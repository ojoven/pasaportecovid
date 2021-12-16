var Passport = {

	showPassport: function () {
		let data = Storage.get('pasaporte');
		console.log(data);

		$('.js-passport').addClass('is-active');
		$('.js-passport').attr('data', data);
	}

}