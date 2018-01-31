var page = require('webpage').create();
//url = 'https://www.instagram.com/p/BapZ2NABT8j/?taken-by=nani.shoots'
url = 'https://www.instagram.com/p/BU0CaTfhg8x/?taken-by=nani.shoots'

page.open(url, function(status) {
  console.log("Status: " + status);

  var imageUrl = page.evaluate(function() {
    //return document.querySelector("img[srcset]").src;
    return document.querySelector("img._2di5p").src;
  });

  console.log("imageUrl: " + imageUrl);

  phantom.exit();
});
