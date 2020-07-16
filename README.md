# web-e2e-test
[Refer to the blog](https://medium.com/@adrian_lewis/top-5-most-rated-node-js-frameworks-for-end-to-end-web-testing-f8ebca4e5d44)

### TestCafe

- 用js / ts写
- 并发性测试执行
- 支持无头模式的浏览器测试
- 不需要WebDriver来处理浏览器
- 有`before`/`after`/`beforeEach`/`afterEach`的生命周期函数
- 支持截图

#### Example
```
import { Selector } from 'testcafe';
fixture `Testcafe Demo`
  .page `localhost:4200/login`;

test('My first test', async t => {
  await t
    .click('.cgd-menubar-content button')
    .typeText('#username','liyanyu')
    .typeText('#password','liyanyu')
    .click('.cgd-red-login-button button');

  await t.takeScreenshot('/login.png');
  await t.expect(Selector('.createBtn button .cgd-button-text').innerText).eql('Create a new project');

  await t.click('.createBtn button')
    .click('.cgd-dialog-footer button[label=Next]')
    .click('.cgd-dialog-footer button[label=Finish]');

  await t.setFilesToUpload('input.cgd-choose-file','./../nmos_sc.gds');
});
```

#### run

> testcafe firefox [source]<br>
`-c<n>` 并发运行次数<br>
`chrome:emulation:device=iphone 6` Chrome设备模拟<br>
`remote<:n>` 远程浏览器(数量)<br>
`-s <path>` 截图地址<br>
`-r` 输出文件的保存地址，多种文件类型可选`xml`，`json`

### Nightwatch.js

- 运行在Selenium中，需要java jdk 7以上版本
- 不同浏览器需要下载不同的webdriver
- 有`before`/`after`/`beforeEach`/`afterEach`的生命周期函数
- 可以设置tags 同时测试多个具有指定tag名的文件
- 具有单元测试的功能
- url地址需要写完整
- 支持截图
- `nightwatch.json`文件中，以`output_folder`设置测试结果文件保存位置

#### Example
```
module.exports = {
  '@tags': ['vtcad','demo'],
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
  }
};
```

#### run


> java -jar selenium-server-standalone-{VERSION}.jar<br>
global install<br>
`nightwatch [source] [options]`<br>
project specific<br>
`./node_modules/.bin/nightwatch [source] [options]`<br>
并发运行<br>
nightwatch -e default,chrome

### Protractor

- 基于`webdriver-manager`
- 具有`Jasmine`的`describe`和`it`语法
- 适用于angular项目，与angular项目自己的ng e2e测试是一致的
- 支持ts
- 支持截图
- `conf.js`文件中以`resultJsonOutputFile`设置测试结果输出文件

#### Example
```
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
    element(by.css('.cgd-menubar-content button')).click();
    element(by.css('#username')).sendKeys('liyanyu');
    element(by.css('#password')).sendKeys('liyanyu');
    element(by.css(".cgd-red-login-button button")).click();
    expect(element(by.css('.createBtn button .cgd-button-text')).getText()).toEqual('Create a new project');
    browser.takeScreenshot().then((png)=>{
      writeScreenShot(png,'login.png');
    })
  });

  it('create project', function() {
    element(by.css(".createBtn button")).click();
    element(by.css(".cgd-dialog-footer button[label=Next]")).click();
    element(by.css(".cgd-dialog-footer button[label=Finish]")).click();
  });

  it('upload', function() {
    let absolutePath = path.resolve(__dirname, './../nmos_sc.gds')
    element(by.css(".cgd-choose-file")).sendKeys(absolutePath);
  });
});

```

#### run

> webdriver-manager start<br>
protractor conf.js

### CasperJS

- 基于无头浏览器引擎（`PhantomJS`或`SlimerJS`）
- `TypeError: Attempting to change the setter of an unconfigurable property.`错误由PhantomJS在ubuntu18.04中引起，且PhantomJs停止开发了
- 支持单元测试
- url地址需完整地址
- fill系列方法需要有form标签 [（例子）](http://docs.casperjs.org/en/latest/modules/casper.html#fill)
- 支持截图,截图整个网页

#### Example
```
casper.test.begin("vtcad test", 1, function(test) {
  casper.start('http://localhost:4200/')
  .viewport(800, 600).then(function(){
    this.capture("screenshots/screenshot.png");
  })
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

```

#### run

> casperjs test [source]<br>
`--xunit`以`xml`文件输出测试结果

### codeceptJS

- 并非真正的测试框架，只是在别的测试框架的基础上包装了一层`I`语法
- 可以根据页面上的text查找元素
- 利用`codeceptjs init`创建测试项目

#### Example
```
Feature('Test');

Scenario('test something', (I) => {
  I.amOnPage('localhost:4200');
  I.see('VisualTCAD');
  I.click('Sign in');
  I.fillField('#username','liyanyu');
  I.fillField('#password','liyanyu');
  I.pressKey('Enter');
  I.see('Dashboard');
  I.click('Create a new project');
  I.click('Next');
  I.click('Finish');
  I.attachFile('.cgd-choose-file','./../nmos_sc.gds');
  I.see('Loading...')
});

```

#### run

> codeceptjs init<br>
codeceptjs gt<br>
codeceptjs run --steps
