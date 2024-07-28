import { test, expect } from "@playwright/test";

const UI_URL = "http://127.0.0.1:5173/";

const UI_URL_REGISTER = "http://127.0.0.1:5173/register";

test("goto base URL", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In Here" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("e@yopmail.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign In Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("register a new account", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 1000}@test.com`;
  // Navigate to the specified URL where the registration form is expected to be
  await page.goto(UI_URL_REGISTER);

  // Check if the "Create an Account" header is visible
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  // Fill in the registration form fields
  await page.locator("[name='firstName']").fill("John");
  await page.locator("[name='lastName']").fill("Doe");
  await page.locator("[name='email']").fill(testEmail);
  await page.locator("[name='password']").fill("securepassword123");
  await page.locator("[name='confirmPassword']").fill("securepassword123");

  // Submit the registration form
  await page.getByRole("button", { name: "Create account" }).click();

  // Optionally, check for a success message or redirection to a login/dashboard page
  await expect(page.getByText("Registeration Successful")).toBeVisible();
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });
