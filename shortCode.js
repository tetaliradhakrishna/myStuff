var shortUrl = require('node-url-shortener');
 
  var url = 'http://esignup.in' + '/offers/get/' + '9030858444' + "?redirectUrl=" + 'http://whiznext.com' + '?campaignName=' + 'radha';
shortUrl.short(url, function(err, url){
    console.log(url);
});