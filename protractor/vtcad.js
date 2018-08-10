let path = require('path');
let fs = require('fs');

function writeScreenShot(data, filename) {
  let stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

describe('vtcad test demo', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it('login', function() {
    browser.get('localhost:4200');
    browser.takeScreenshot().then((png)=>{
      writeScreenShot(png,'login.png');
    })
    element(by.css('.cgd-menubar-content button')).click();
    element(by.css('#username')).sendKeys('liyanyu');
    element(by.css('#password')).sendKeys('liyanyu');
    element(by.css(".cgd-red-login-button button")).click();
  });

  it('create project', function() {
    expect(element(by.css('.createBtn button .cgd-button-text')).getText()).toEqual('Create a');
    element(by.css(".createBtn button")).click();
    element(by.css(".cgd-dialog-footer button[label=Next]")).click();
    element(by.css(".cgd-dialog-footer button[label=Finish]")).click();
  });

  it('upload', function() {
    let absolutePath = path.resolve(__dirname, './../nmos_sc.gds')
    element(by.css(".cgd-choose-file")).sendKeys(absolutePath);
  });
});
