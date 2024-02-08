import { LoginPage } from "../page-object-model/LoginPage/LoginPage";
import { test as base } from "@playwright/test";

interface PageObjects {
  loginPage: LoginPage;
  navigateToPage: string;
}

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  navigateToPage: async ({ loginPage }, use) => {
    await loginPage.navigateTo("login");
    await use("");
  },
});

export { expect } from "@playwright/test";
