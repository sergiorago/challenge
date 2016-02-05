var app = app || {};

(function () {

	'use strict';

	app.ArticleView = Backbone.View.extend({
        "render": function() {
            var source = $('#article-template').html(),
                template = Handlebars.compile(source),
                html = template(this.model.toJSON());

            this.$el.append(html);

            return html;
        }
	});
})();
