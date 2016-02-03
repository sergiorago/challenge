var app = app || {};

(function ($) {
	'use strict';

	app.PlaceView = Backbone.View.extend({

		"el": $('.place'),

		"initialize": function () {
        	this.model.on('change:city', this.fetchArticles, this);
			this.model.on('change:year', this.fetchArticles, this);

			this.render();
        },

		"render": function () {

			var source = $('#place-template').html(),
				template = Handlebars.compile(source),
				html = template(this.model.toJSON()),
				that = this;

			this.$el.html(html);

			//Initilize jquey componets
			$('.slider-input').slider().bind("slideStop", function(event, result){
				that.updateYear();
		  	});
			
			$(".input-city").geocomplete().bind("geocode:result", function(event, result){
				that.updateCity();
		  	});

			this.fetchArticles();
		},

		"fetchArticles": function() {
			if(this.model.get("city")){
				app.articles = new app.Articles();

				app.articles.fetch({
					"data": {
						"fq": "glocations.contains(\""+this.model.get("city")+"\")",
						"begin_date": this.model.get("year").toString() + "0101",
						"end_date": this.model.get("year").toString() + "1231",
					},
					"async": true,
					"success": function() {
						var articlesView = new app.ArticlesView({
							"collection": app.articles,
							"el": $('.articles')
						});
					}
				});
			};
		},

		"events": {
			//"change .input-city": "updateCity",
			//"change .input-year": "updateYear"
		},

		"updateYear": function() {
			var year = this.$el.find(".input-year").val();

			this.model.set({"year": year});
		},

		"updateCity": function() {
			var city = this.$el.find(".input-city").val();
			city = city.split(",")[0];
			this.model.set({"city": city});
		}

	});
})(jQuery);
