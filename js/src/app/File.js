$(function () {
	File.initializeFileUploading();
})

var File = {

	initializeFileUploading: function () {
		let self = this;

		$('#uploadFile').on('change', function (e) {
			let file = e.target.files[0];

			var reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = function (e) {

				var passport = e.target.result;

				if (passport.substring(5, 10) !== 'image'
					&& passport.substring(5, 20) !== 'application/pdf') {
					self.showErrorPasswordInvalidFile();
					return false;
				}

				Storage.set('pasaporte', passport);
				Passport.showPassport();
				if (!PWA.isAlreadyInstalled()) {
					Success.openModal();
				}
			}
		});
	},

	showErrorPasswordInvalidFile: function () {
		alert('El formato del archivo no es reconocido. Formatos aceptados: PDF, JPG, PNG.');
	}

}