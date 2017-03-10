import { TIwPRPage } from './app.po';

describe('tiw-pr App', () => {
  let page: TIwPRPage;

  beforeEach(() => {
    page = new TIwPRPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
