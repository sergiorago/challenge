// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
app.Article = Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
        id: "",
        headline: "",
        url: "#",
        snippet: ""
    }
});
