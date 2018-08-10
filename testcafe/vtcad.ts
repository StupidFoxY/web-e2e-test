import { Selector } from 'testcafe';
fixture `Testcafe Demo`
  .page `localhost:4200`;

test('My first test', async t => {
  let a = await t.click('.cgd-menubar-content button');
  console.log(a);
  // await t.wait( 100000 );
  await t.typeText('#username','liyanyu');
  await t.typeText('#password','liyanyu');
  await t.click('.cgd-red-login-button button');
  await t.takeScreenshot('/login.png');

  await t.expect(Selector('.createBtn button .cgd-button-text').innerText).eql('Create');

  await t.click('.createBtn button')
    .click('.cgd-dialog-footer button[label=Next]')
    .click('.cgd-dialog-footer button[label=Finish]');

  await t.setFilesToUpload('input.cgd-choose-file','./../nmos_sc.gds');
});
