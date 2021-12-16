var File = {

	initializeFileUploading: function () {

		$('#uploadFile').on('change', function () {
			let file = e.target.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = function (e) {
				Storage.set('pasaporte', e.target.result);
				Passport.showPassport();
			}
		});
	}

}