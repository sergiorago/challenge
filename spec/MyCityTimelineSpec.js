
describe("NYT Api", function() {
    app.articles = new app.Articles();
    var articlesLoaded = false;

    beforeEach(function(done) {

        app.articles.fetch({
            data: {
                "q": "Bogota",
                "sort": "newest"
            },
            async: false,
            success: function() {
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

describe("Google Api", function() {

    beforeEach(function(done) {

    });

    it("Should be able to load cities autocomplete information", function(done) {
        expect(articlesLoaded).toBe(true);
        done();
    });
});
