import { TaxbackPage } from './app.po';

describe('taxback App', () => {
  let page: TaxbackPage;

  beforeEach(() => {
    page = new TaxbackPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
