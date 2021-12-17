/*
|--------------------------------------------------------------------------
| SHARE
|--------------------------------------------------------------------------
*/

$(function () {
	Share.initializeDomNodes();
	Share.handlePassportShareLinks();
	Share.handlePassportCopyLink();
});

var Share = {

	initializeDomNodes: function () {
		this.$toPassportShare = $('.js-to-share');
		this.$passportCopyLink = $('.js-share-copy-link');
		this.$passportCopyLinkNotification = $('.js-share-copy-link-notification');
	},

	// Functions
	handlePassportShareLinks: function () {

		this.$toPassportShare.off().on('click', function (e) {
			e.preventDefault();

			var url = $(this).attr('href');
			window.open(url, 'share', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		});
	},

	handlePassportCopyLink: function () {

		let self = this;

		this.$passportCopyLink.off().on('click', function (e) {
			e.preventDefault();
			navigator.clipboard.writeText(self.$passportCopyLink.attr('href')); // copy href to clipboard
			self.$passportCopyLinkNotification.addClass('is-active');
			setTimeout(function () {
				self.$passportCopyLinkNotification.removeClass('is-active');
			}, 5000);
		});

	}
};