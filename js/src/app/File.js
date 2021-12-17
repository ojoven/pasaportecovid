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
				Storage.set('pasaporte', e.target.result);
				Passport.showPassport();
				if (!PWA.isAlreadyInstalled()) {
					Success.openModal();
				}
			}
		});
	},

}