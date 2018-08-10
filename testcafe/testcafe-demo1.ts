import { Selector } from 'testcafe';
fixture `Getting Started`
  .page `http://devexpress.github.io/testcafe/example`;

test('My first test', async t => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');

  const articleHeader = await Selector('.result-content > h1');

  // Obtain the text of the article header
  let headerText = await articleHeader.innerText;
  console.log(headerText);
});
