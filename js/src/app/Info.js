$(function () {
	Info.handleToInfo();
	Info.handleCloseInfo();
});

var Info = {

	handleToInfo: function () {
		$('.js-to-info').on('click', function () {
			$('.js-info').addClass('is-active');
		});
	},

	handleCloseInfo: function () {
		$('.js-to-close-info').on('click', function () {
			$('.js-info').removeClass('is-active');
		});
	}
}