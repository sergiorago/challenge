var app = app || {};

(function () {

	'use strict';

	app.ArticlesView = Backbone.View.extend({
		"initialize": function () {
			this.render();
        },

        "render": function() {
            var source = $('#articles-template').html(),
                template = Handlebars.compile(source),
                html = template(this.collection._meta);

            this.$el.html(html);

            var $articlesList = this.$el.find('.articles-list');

            this.collection.each(function ( model ) {
                var articleView = new app.ArticleView({
                    "model": model,
                    "el": $articlesList
                });
            });

			//Initilize Jquery components
			$(".articles-list").waterfall({
				colMinWidth: 400,
				defaultContainerWidth: 800,
				autoresize: true
			});
        }
	});
})();
