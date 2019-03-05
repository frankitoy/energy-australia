import { browser, by, element } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class AppPage {
  async navigateTo(): wdpromise.Promise<any> {
    return await browser.get('/');
  }

  getTitleText() {
    return element(by.css('ea-root h1')).getText();
  }

  getCarShows() {
    return element.all(by.css('mat-card-title')).first();
  }
}
