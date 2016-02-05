var app = app || {};

(function () {

	'use strict';

	app.PlaceView = Backbone.View.extend({

		"el": $('.place'),

		"initialize": function () {
        	this.model.on('change:city', this.fetchArticles, this);
			this.model.on('change:year', this.fetchArticles, this);
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
				app.articles = new app.Articles([], {
					"city": this.model.get("city"),
					"year": this.model.get("year")
				});

				app.articles.fetch({
					"data": {
						"q": app.articles.meta("city"),
						"fq": "glocations(\""+app.articles.meta("city")+"\")",
						"begin_date": app.articles.meta("year").toString() + "0101",
						"end_date": app.articles.meta("year").toString() + "1231",
						"hl": true
					},
					"async": true,
					"success": function() {
						var articlesView = new app.ArticlesView({
							"collection": app.articles,
							"el": $('.articles')
						});

						articlesView.render();
					}
				});
			};
		},

		"events": {
			"keyup .input-city" : "citykeyPress"
		},

		"citykeyPress": function(event) {
			if(event.keyCode == 13){
		        this.updateCity();
		    }
		},

		"updateYear": function() {
			var year = this.$el.find(".input-year").val();

			this.model.set({"year": year});
		},

		"updateCity": function() {
			var city = this.$el.find(".input-city").val().replace("-",",");
			city = city.split(",")[0];
			this.model.set({"city": city});
		}

	});
})();
