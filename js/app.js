var app = app || {};

(function () {
	$(function () {

		'use strict';

		app.place = new app.Place();

		var placeView = new app.PlaceView({
			"model": app.place,
			"el": $('.place')
		});

		placeView.render();
	});
})();
