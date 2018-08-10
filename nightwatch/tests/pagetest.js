module.exports = {
  '@tags': ['demo'],
  // '@disabled': true,
  beforeEach: (browser, done)=> {
    // performing an async operation
    setTimeout(()=> {
      console.log(222)
      done(); //as the last step, Not calling it will result in a timeout error.
    }, 100);
  },
  'step one' : function (browser) {
    let baidu = browser.page.baidu();
    baidu.navigate()
      .assert.title('百度一下，你就知道')
      .assert.visible('@searchBar')
      .setValue('@searchBar', 'nightwatch')
      // .click('@submit');
      .submitEvent();
  },
  'step two' : function (browser) {
    browser.expect.element('body').to.be.present.before(1000);
    browser.end();
  }
};
