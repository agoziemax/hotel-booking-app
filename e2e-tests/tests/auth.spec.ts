import { test, expect } from "@playwright/test";

const UI_URL = "http://127.0.0.1:5173/";

test("goto base URL", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In Here" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign In Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });
