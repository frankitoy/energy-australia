import { AppPage } from './app.po';

import { environment } from '../../src/environments/environment';

describe(`${environment.appName} e2e tests`, () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual(`Welcome to ${environment.appName}!`);
  });

  it('should display the list of car shows', () => {
    page.navigateTo();
    debugger;

  });
});
