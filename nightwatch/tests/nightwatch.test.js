module.exports = {
  '@tags': ['nightwatch','demo'],
  beforeEach: (browser, done)=> {
    // performing an async operation
    setTimeout(()=> {
      console.log(111)
      done(); //as the last step, Not calling it will result in a timeout error.
    }, 100);
  },
  'step one' : function (browser) {
    browser
      .url('http://www.baidu.com')
      .useCss()
      .waitForElementVisible('body', 1000)
      .setValue('#kw', 'nightwatch')
      .waitForElementVisible('#su', 1000)
      .click('#su')
      .pause(1000);
      // .assert.containsText('#main', 'Night Watch')
  },
  'step two' : function (browser) {
    browser.expect.element('body').to.be.present.before(1000);
    browser.end();
  }
};
