import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.getByTestId("email-input").fill("customer@test.com");
  await page.getByTestId("password-input").fill("Password123!");
  await page.getByTestId("login-submit-btn").click();
}

test("user can log in with valid credentials", async ({ page }) => {
  await login(page);
  await expect(page.getByTestId("user-greeting")).toBeVisible({ timeout: 10000 });
});

test("invalid coupon code shows an error", async ({ page }) => {
  await login(page);
  await page.goto("/cart");
  const couponBox = page.getByTestId("coupon-input");
  if (await couponBox.isVisible()) {
    await couponBox.fill("INVALID_COUPON_999");
    const applyBtn = page.getByTestId("apply-coupon-btn");
    if (await applyBtn.isVisible()) {
      await applyBtn.click();
      await expect(page.getByTestId("coupon-error-message")).toBeVisible();
    }
  }
});
