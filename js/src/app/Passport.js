var Passport = {

	showPassport: function () {
		let data = Storage.get('pasaporte');
		if (!data) return;

		var passport = Storage.get('pasaporte');
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
		}, function (reason) {
			// PDF loading error
			console.error(reason);
		});

		$('.js-passport').addClass('is-active');
		$('.js-passport').attr('src', data);
		$('.js-to-passport-header').addClass('is-active');
	}

}