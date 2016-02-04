var app = app || {};

(function () {

	'use strict';

	var currentYear = new Date().getFullYear();

	app.Place = Backbone.Model.extend({
		"defaults": {
			"year": currentYear,
			"minYear": 1900,
			"maxYear": currentYear
		}
	});
})();
