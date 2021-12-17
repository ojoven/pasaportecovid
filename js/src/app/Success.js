$(function () {
	Success.handleCloseModal();
});

var Success = {

	openModal: function () {
		$('.js-success').addClass('is-active');
	},

	handleCloseModal: function () {
		$('.js-to-close-success').on('click', function () {
			$('.js-success').removeClass('is-active');
		});
	},

	closeSuccess: function () {
		$('.js-success').removeClass('is-active');
	}
}