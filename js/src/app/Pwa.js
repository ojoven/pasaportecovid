/*
|--------------------------------------------------------------------------
| PWA
|--------------------------------------------------------------------------
*/

$(function () {
	PWA.initialize();
});

var deferredPrompt;

var PWA = {

	showInstallable: function () {
		if (!this.isAlreadyInstalled()) {
			$('.js-to-install').addClass('is-active');
		}
	},

	promptEvent: null,
	androidChromeActive: false,

	initialize: function () {

		this.initializeDomNodes();

		var self = this;

		if (this.isIOSSafari()) {
			this.showIOSSafariMessage();
		} else if (this.isIOSChrome()) {
			this.showIOSChromeMessage();
		} else {
			setTimeout(function () {
				self.showDefaultMessage();
			}, 1500);
		}

	},

	initializeDomNodes: function () {
		this.$iosSafariMessage = $('.js-install-view[data-view="ios-safari"]');
		this.$iosChromeMessage = $('.js-install-view[data-view="ios-chrome"]');
		this.$defaultMessage = $('.js-install-view[data-view="default"]');
		this.$loadingMessage = $('.js-install-is-loading');
	},

	// Ready
	isAlreadyInstalled: function () {
		return window.matchMedia('(display-mode: standalone)').matches;
	},

	isIOSSafari: function () {
		var ua = window.navigator.userAgent;
		var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
		var webkit = !!ua.match(/WebKit/i);
		var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

		return iOSSafari;
	},

	isIOSChrome: function () {
		var ua = window.navigator.userAgent;
		var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
		var webkit = !!ua.match(/WebKit/i);
		var iOSChrome = iOS && webkit && ua.match(/CriOS/i);

		return iOSChrome;
	},

	showIOSSafariMessage: function () {
		PWA.$iosSafariMessage.addClass('is-active');
	},

	showIOSChromeMessage: function () {
		PWA.$iosChromeMessage.addClass('is-active');
	},

	showAndroidChromeMessage: function () {
		PWA.androidChromeActive = true;

		$('.js-to-install').off().on('click', function (e) {
			e.preventDefault();
			deferredPrompt.prompt();
		});
	},

	showDefaultMessage: function () {
		if (PWA.androidChromeActive) return;
		$('.js-install-view[data-view="default"]').addClass('is-active');
	},

};

window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt = e;
	PWA.initializeDomNodes();
	PWA.showAndroidChromeMessage();
});

window.addEventListener('appinstalled', (e) => {
	// app installed
});