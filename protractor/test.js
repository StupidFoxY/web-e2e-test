describe('angularjs homepage todo list', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('https://www.baidu.com/');
  });

  it('get title', function() {
    expect(browser.getTitle()).toEqual('百度一下，你就知道');
  });

  it('search protractor', function() {
    element(by.css('#kw'))
      .sendKeys('protractor')
      .sendKeys(protractor.Key.ENTER);
    expect(browser.getTitle()).toEqual('protractor_百度搜索');
  });
});
