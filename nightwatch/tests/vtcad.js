module.exports = {
  '@tags': ['vtcad'],
  beforeEach: (browser, done)=> {
    // performing an async operation
    setTimeout(()=> {
      console.log(111)
      done(); //as the last step, Not calling it will result in a timeout error.
    }, 100);
  },
  'login' : function (browser) {
    browser
      .url('http://localhost:4200')
      .waitForElementVisible('body', 1000)
      .click('.cgd-menubar-content button')
      .setValue('#username', 'liyanyu')
      .setValue('#password', 'liyanyu')
      .waitForElementVisible('.cgd-red-login-button button', 1000)
      .click('.cgd-red-login-button button')
      .saveScreenshot('./screenshot/search-result.png');
  },
  'create project' : function (browser) {
    browser
      .waitForElementVisible('.createBtn button', 1000)
      .assert.containsText('.createBtn button .cgd-button-text', 'Create a new project')
      .click('.createBtn button')
      .click('.cgd-dialog-footer button[label=Next]')
      .click('.cgd-dialog-footer button[label=Finish]');
  },
  'upload file' : function (browser) {
    browser
      .setValue('input.cgd-choose-file', require('path').resolve(__dirname + '/../../nmos_sc.gds'))
      .pause(5000)
      .end();
  },
};
