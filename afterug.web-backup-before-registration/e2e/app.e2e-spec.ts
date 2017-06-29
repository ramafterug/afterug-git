import { AfterugWebCliGitTestPage } from './app.po';

describe('afterug-web-cli-git-test App', () => {
  let page: AfterugWebCliGitTestPage;

  beforeEach(() => {
    page = new AfterugWebCliGitTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
