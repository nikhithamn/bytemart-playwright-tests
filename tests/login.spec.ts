import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/");
  const userName = page.locator('[data-test="username"]');
  await userName.fill("standard_user");
  const password = page.locator('[data-test="password"]');
  await password.fill("test1234");
  const loginButton = page.locator('[data-test="login-button"]');
  await loginButton.click();
}

test("user can log in with valid credentials", async ({ page }) => {
  await page.goto("/");
  const userName = page.locator('[data-test="username"]');
  await userName.fill("standard_user");
  const password = page.locator('[data-test="password"]');
  await password.fill("test1234");
  const loginButton = page.locator('[data-test="login-button"]');
  await loginButton.click();
  await expect(page).toHaveURL(/inventory.html/);
});

test("invalid coupon code shows an error", async ({ page }) => {
  await login(page);
  const addToCartButton = page.locator('[data-test="add-to-cart-desk-lamp"]');
  await addToCartButton.click();
  const cartLink = page.locator('[data-test="cart-link"]');
  await cartLink.click();
  const couponBox = page.locator('[data-test="coupon-input"]');
  await couponBox.fill("FAKECODD99");
  const applyButton = page.locator('[data-test="apply-coupon-button"]');
  await applyButton.click();
  const errorMessage = page.locator('[data-test="coupon-error"]');
  await expect(errorMessage).toBeVisible();
});
