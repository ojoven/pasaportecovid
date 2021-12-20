var Passport = {

	showPassport: function () {
		let data = Storage.get('pasaporte');
		if (!data) return;

		PWA.showInstallable();

		var passport = Storage.get('pasaporte');
		var type = passport.substring(5, 10) === 'image' ? 'image' : 'pdf';

		// Image
		if (type === 'image') {
			$('.js-passport-image').attr('src', passport);
			$('.js-passport-image-container').addClass('is-active');
			$('.js-passport-pdf').removeClass('is-active');
		} else {
			// PDF
			passport = passport.replace('data:application/pdf;base64,', '');
			var pdfData = atob(passport);
			var pdfjsLib = window['pdfjs-dist/build/pdf'];

			// The workerSrc property shall be specified.
			pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.js';

			// Using DocumentInitParameters object to load binary data.
			var loadingTask = pdfjsLib.getDocument({ data: pdfData });
			loadingTask.promise.then(function (pdf) {

				// Fetch the first page
				var pageNumber = 1;
				pdf.getPage(pageNumber).then(function (page) {
					console.log('Page loaded');

					var scale = 1.5;
					var viewport = page.getViewport({ scale: scale });

					// Prepare canvas using PDF page dimensions
					var canvas = document.getElementById('passport');
					var context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					// Render PDF page into canvas context
					var renderContext = {
						canvasContext: context,
						viewport: viewport
					};
					var renderTask = page.render(renderContext);
					renderTask.promise.then(function () {
						console.log('Page rendered');
					});
				});

				$('.js-passport-pdf').attr('src', data);
				$('.js-passport-image-container').removeClass('is-active');
				$('.js-passport-pdf').addClass('is-active');

			}, function (reason) {
				// PDF loading error
				console.error(reason);
			});
		}

		$('.js-passport').addClass('is-active');
		$('.js-to-passport-header').addClass('is-active');
		$('.js-welcome').hide();
	}

}