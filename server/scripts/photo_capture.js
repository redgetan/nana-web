var async = require("async");
var page = require('webpage').create();

urls = [
  "https://www.instagram.com/p/Beoy1SiDLO6/?taken-by=crookedabstract",
  "https://www.instagram.com/p/BdLTdUnDhJv/?taken-by=crookedabstract",
  "https://www.instagram.com/p/BclJ15GDafs/?taken-by=crookedabstract",
  "https://www.instagram.com/p/BcgIlTljiZj/?taken-by=crookedabstract",
  "https://www.instagram.com/p/BWJdrTxFjvI/?taken-by=crookedabstract"
];

function getImageUrl(url, cb) {
  page.open(url, function(status) {
    var imageUrl = page.evaluate(function() {
      return document.querySelector("img._2di5p").src;
    });

    cb(null, imageUrl);
  });
}

async.mapSeries(urls, getImageUrl, function(err, results) {
  console.log(JSON.stringify(results));
  phantom.exit();
});
