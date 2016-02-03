Handlebars.registerHelper('getWikiUrl', function(item) {
	var wiki_url = "https://en.wikipedia.org/wiki/";
	if(item) {
		wiki_url = wiki_url+item;
	}
	return wiki_url; //Return string whit escape characters
});

Handlebars.registerHelper('getAddressImageUrl', function(street, city) {
    var address = street + ' ,' + city;
	var imageUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address;
    return imageUrl;
});
