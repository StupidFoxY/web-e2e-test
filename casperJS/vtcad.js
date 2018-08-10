casper.test.begin("vtcad test", 1, function(test) {
  casper.start('http://localhost:4200/')
  .waitForSelector('.cgd-menubar-content button',function() {
    this.click('.cgd-menubar-content button');
  })
  .waitForSelector('form.cgd-red-login-form',function() {
    this.fillSelectors('form.cgd-red-login-form', {
      '#username': 'liyanyu',
      '#password': 'liyanyu'
    }, false);
  })
  .waitForSelector('.cgd-red-login-button button',function(){
    this.click('.cgd-red-login-button button');
  })
  .waitForSelector('.createBtn button',function() {
    this.click('.createBtn button');
  })
  .waitForSelector('.cgd-dialog-footer button[label=Next]',function() {
    this.click('.cgd-dialog-footer button[label=Next]');
  })
  .waitForSelector('.cgd-dialog-footer button[label=Finish]',function() {
    this.click('.cgd-dialog-footer button[label=Finish]');
  })
  .waitForSelector('.cgd-choose-file',()=> {
    test.assertExists('.cgd-choose-file');
  })
  .run();
});
