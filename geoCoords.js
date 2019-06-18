var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBmd8kr7HfBVdgUINdV0C9miPBD8z-8jL4', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode('vijayawada', function (err, res) {
    console.log(res);
});