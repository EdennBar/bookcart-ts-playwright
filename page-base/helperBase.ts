import { Page } from "@playwright/test";

export class HelperBase {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateTo(URL: string) {
    await this.page.goto(`https://bookcart.azurewebsites.net/${URL}`);
  }

  public async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
