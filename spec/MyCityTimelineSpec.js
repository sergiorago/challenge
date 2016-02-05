var app = app || {};

(function () {
	$(function () {

        describe("My City Timeline", function() {

            it("Should be able to create a place", function() {
                var place = new app.Place();

                expect(place).toBeDefined();
            });

            it("Should be able to create a places view", function() {
                var place = new app.Place({"city": 'Bogota', "year": '2007'}),
                    placeView = new app.PlaceView({
        			"model": place,
        			"el": $('body')
        		});

                expect(placeView).toBeDefined();
            });

            it("Should be able to create a article", function() {
                var article = new app.Article();

                expect(article).toBeDefined();
            });

            it("Should be able to create a articles view", function() {
                var article = new app.Article(),
                    articleView = new app.ArticleView({
        			"model": article,
        			"el": $('body')
        		});

                expect(articleView).toBeDefined();
            });

            it("Should be able to create a articles collection", function() {
                var articles = new app.Articles([],{
                    "city": 'New York City',
                    "year": '2015'
                });

                expect(articles).toBeDefined();
            });

            it("Should be able to create a articles collection view", function() {
                var articles = new app.Articles([],{
                    "city": 'New York City',
                    "year": '2015'
                }),
                    articlesView = new app.ArticleView({
        			"collection": articles,
        			"el": $('body')
        		});

                expect(articlesView).toBeDefined();
            });
        });

        describe("NYT Api", function() {
            var articles = new app.Articles([],{
                "city":"New York City",
                "year":"2015"
            }),
                articlesLoaded = false;

            beforeEach(function(done) {
                articles.fetch({
                    "data": {
                        "fq": "glocations.contains(\""+articles.meta("city")+"\")",
                        "begin_date": articles.meta("year").toString() + "0101",
                        "end_date": articles.meta("year").toString() + "1231",
                    },
                    "async": true,
                    "success": function() {
                        articlesLoaded = true;
                        done();
                    }
                });
            });

            it("Should be able to load articles information", function(done) {
                expect(articlesLoaded).toBe(true);
                done();
            });
        });
	});
})();
