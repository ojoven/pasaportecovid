$(function () {
	Modal.handleToModal();
	Modal.handleCloseModal();
});

var Modal = {

	handleToModal: function () {
		$('.js-to-modal').on('click', function () {
			var modal = $(this).attr('data-modal');
			if (modal === 'install') Success.closeSuccess();

			var $modal = $('.js-modal[data-modal="' + modal + '"]');
			$modal.addClass('is-active');
			setTimeout(function () {
				$modal.find('.js-to-close-modal').focus();
			}, 50);

		});
	},

	handleCloseModal: function () {
		$('.js-to-close-modal').on('click', function () {
			$('.js-modal').removeClass('is-active');
			var modal = $(this).closest('.js-modal').attr('data-modal');
			setTimeout(function () {
				$('.js-to-modal[data-modal="' + modal + '"]').focus();
			}, 50);
		});
	}
}