/*global Backbone */
var app = app || {};

(function () {

	'use strict';

	app.Articles = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Article,

		"initialize": function(models, options) {
	        this._meta = {
				"city": options["city"],
				"year": options["year"]
			};
	    },

		"meta": function(prop, value) {
	        if (value === undefined) {
	            return this._meta[prop]
	        } else {
	            this._meta[prop] = value;
	        }
	    },

        "apiKey": "0457a67e1cf6851de0806a0c2cdb144d:8:74097763",

        "url": "http://api.nytimes.com/svc/search/v2/articlesearch.json",

		"imgsUrl": "http://nytimes.com/",

        "parse": function(response) {
			var that = this,
			 	lst = _.map(response.response.docs, function(val) {

				var img = "";
				if(val.multimedia.length > 0){
					img = that.imgsUrl + val.multimedia[0].url;
				};
				return {
					"headline": val.headline.main,
                    "snippet": val.snippet,
                    "url": val.web_url,
					"img": img,
					"pub": val.pub_date.substring(0, 10)
				};
			});

			return lst;
		},

        "sync": function(method, collection, options) {
            var that = this;

            if(!options["data"]["api-key"]){
                options["data"]["api-key"] = that.apiKey;
            };

            var params = _.extend({
				"url": that.url,
                "dataType": "json"
            },options);

			try{
				return $.ajax(params);
			}
			catch(err){

			}
        }
	});
})();
