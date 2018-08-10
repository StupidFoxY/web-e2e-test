var casper = require('casper').create();
let links;

function getLinks() {
// Scrape the links from top-right nav of the website
  var links = document.querySelectorAll('ul.navigation li a');
  return Array.prototype.map.call(links, function (e) {
    return e.getAttribute('href')
  });
}

casper.start('http://casperjs.org/');

casper.then(function() {
  this.echo('Page title: ' + this.getTitle());
  links = this.evaluate(getLinks);
});

casper.then(()=>{
  links.forEach((link)=>{
    console.log(link);
  });
});

casper.run();
