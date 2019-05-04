const SEOChecker = require('advanced-seo-checker');
let baseURL = 'www.whiznext.com';
let summaryObj= [];

// multile urls
//let urls = [baseURL,'http://whiznext.com'];

let crawler = SEOChecker(baseURL, {});
crawler.analyze(baseURL).then(function (summary) {
  let util = require('util');
  console.log( "This is the page summary" ,summary.pages);

});
//data();
function data(){


var JSON_DATA = { issues: 
   { errors: { duplicateTitlePages: [Object], duplicateDescPages: [Object] },
     warnings: {},
     notices: {} },
  pages: 
   [ { url: 'http://whiznext.com',
       title: 'Innovative Technology Solutions Company | WhizNext Technologies',
       headers: [Object],
       description: 'WhizNext is a unique technology solutions company providing cutting edge technology solutions with latest Information Technology services, Digital Marketing, SAS, Cloud technology , Mobility, and Internet of Things(IoT).',
       author: null,
       canonical: 'http://www.whiznext.com/',
       keywords: null,
       issues: [Object],
       scores: [Object],
       metrics: [Object],
       h1: '',
       lighthousedata: [Object],
       body: [Object],
       loadingTimeline: [Object],
       isMobileFriendly: true },
     { url: 'http://whiznext.com',
       title: 'Innovative Technology Solutions Company | WhizNext Technologies',
       headers: [Object],
       description: 'WhizNext is a unique technology solutions company providing cutting edge technology solutions with latest Information Technology services, Digital Marketing, SAS, Cloud technology , Mobility, and Internet of Things(IoT).',
       author: null,
       canonical: 'http://www.whiznext.com/',
       keywords: null,
       issues: [Object],
       scores: [Object],
       metrics: [Object],
       h1: '',
       lighthousedata: [Object],
       body: [Object],
       loadingTimeline: [Object],
       isMobileFriendly: true } ] 
     }


console.log(JSON_DATA.pages);
}