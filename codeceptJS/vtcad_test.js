
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
