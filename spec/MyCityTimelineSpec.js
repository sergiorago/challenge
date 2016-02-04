var app = app || {};

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
