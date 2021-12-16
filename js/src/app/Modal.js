$(function () {
	Modal.handleToModal();
	Modal.handleCloseModal();
});

var Modal = {

	handleToModal: function () {
		$('.js-to-modal').on('click', function () {
			var modal = $(this).attr('data-modal');
			console.log(modal);
			$('.js-modal[data-modal="' + modal + '"]').addClass('is-active');
		});
	},

	handleCloseModal: function () {
		$('.js-to-close-modal').on('click', function () {
			$('.js-modal').removeClass('is-active');
		});
	}
}