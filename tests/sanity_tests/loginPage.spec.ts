import { test, expect } from "../../fixtures/baseTest";
import { testData } from "../testData";

test.describe("Comprehensive test suite covering both negative and functional scenarios for the login page", () => {
  const invalidLoginScenarios = [
    {
      scenario: "invalid username",
      username: testData.incorrectUsername,
      password: testData.validPassword,
    },
    {
      scenario: "invalid password",
      username: testData.validUsername,
      password: testData.incorrectPassword,
    },
  ];

  test("Check form elements visibility", async ({
    loginPage,
    navigateToPage,
  }) => {
    const elementsAreVisible = await loginPage.isLoginFormVisible();
    for (const [elementName, isVisible] of Object.entries(elementsAreVisible)) {
      expect(isVisible).toBe(true);
    }
  });

  invalidLoginScenarios.forEach((data) => {
    test(`Test log in functionality with ${data.scenario}`, async ({
      loginPage,
      navigateToPage,
    }) => {
      const expectedErrorMessage = "Username or Password is incorrect.";
      await loginPage.login(data.username, data.password);
      await loginPage.verifyLoginErrorMessage(expectedErrorMessage);
    });
  });

  test("Test log in functionality by submitting empty log in form", async ({
    loginPage,
    navigateToPage,
  }) => {
    await loginPage.login("", "");
    await loginPage.assertErrorRequired();
  });

  test("Test Log in functionality with valid credentials", async ({
    page,
    loginPage,
    navigateToPage,
  }) => {
    await loginPage.login(testData.validUsername, testData.validPassword);
    loginPage.assertLoginSuccessfully(" ortoni ");
    await expect(page).toHaveURL(testData.successfullyLoggedInURL);
  });
});
