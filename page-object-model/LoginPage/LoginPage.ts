import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "../../page-base/helperBase";

export class LoginPage extends HelperBase {
  private errorMessage: Locator;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly dashBoardUserName: Locator;
  private readonly errRequired: Locator;

  constructor(page: Page) {
    super(page);
    this.errRequired = page.getByText("is required");
    this.dashBoardUserName = page.getByText(" ortoni ");
    this.errorMessage = page.getByText("Username or Password is incorrect.");
    this.username = page.locator('input[data-placeholder="Username"]');
    this.password = page.locator('input[data-placeholder="Password"]');
    this.loginButton = page
      .locator("mat-card-actions")
      .getByRole("button", { name: "Login" });
  }

  /** 
@username - Username
@password - Password
@loginButton - Login Button
**/
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccessfully(expectedUsername: string) {
    let usernameTxt = await this.dashBoardUserName.textContent();
    if (usernameTxt === null) {
      throw new Error("usernameTxt is null");
    }
    usernameTxt = usernameTxt.trim();
    expect(usernameTxt).toContain(expectedUsername);
  }

  async verifyLoginErrorMessage(errorMessage: string) {
    await expect(this.errorMessage).toHaveText(errorMessage);
  }

  async assertErrorRequired() {
    const errorMessages = ["Username is required", "Password is required"];
    const errReqInputList = await this.errRequired.all();

    for (let i = 0; i < errorMessages.length; i++) {
      await expect(errReqInputList[i]).toHaveText(errorMessages[i]);
    }
  }

  async isLoginFormVisible() {
    const usernameInputField = this.username;
    const passwordInputField = this.password;
    const submitButton = this.loginButton;

    return {
      isUsernameInputVisible: await usernameInputField.isVisible(),
      isPasswordInputVisible: await passwordInputField.isVisible(),
      isSubmitButtonVisible: await submitButton.isVisible(),
    };
  }
}
