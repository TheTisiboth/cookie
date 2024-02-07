import { env } from "@/env"
import { expect, test } from "@playwright/test"

const BASE_URL = env.KINDE.SITE_URL + "/"
/**
 * Test the authentication flow with a basic user
 * - Login
 * - Access the profile page
 * - Access the my recipes page
 * - Try to access the admin page (should be redirected to the home page)
 * - Logout
 */
test("Test website navigation flow with basic user", async ({ page }) => {
  await page.goto("")

  // Initially, no settings button, no admin, no profile, no my recipes links
  await expect(page.getByLabel("Open settings")).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Admin" })).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Profile" })).not.toBeAttached()
  await expect(
    page.getByRole("link", { name: "My recipes" })
  ).not.toBeAttached()

  // Login
  await page.getByRole("heading", { name: "Home page" }).click()
  await page.getByRole("link", { name: "Sign in" }).click()
  await page.getByTestId("auth-email-field").click()
  await page.getByTestId("auth-email-field").fill(env.BASIC_USER.email)
  await page.getByTestId("auth-submit-button").click()
  await page.getByLabel("Password", { exact: true }).click()
  await page
    .getByLabel("Password", { exact: true })
    .fill(env.BASIC_USER.password)
  await page.getByRole("button", { name: "Continue" }).click()

  // After login, Settings button is visible
  // Because the user is a basic user, he cannot access the admin page
  await expect(page.getByLabel("Open settings")).toBeVisible()
  await expect(page.getByText("Home page")).toBeVisible()
  await expect(page.getByRole("link", { name: "Admin" })).not.toBeAttached()
  expect(page.url()).toBe(BASE_URL)

  // Navigation through the NavBar links
  // My recipes page
  await page.getByRole("link", { name: "My recipes" }).click()

  await expect(page.getByRole("heading", { name: "My Recipes" })).toBeVisible()
  expect(page.url()).toContain("/my-recipes")

  // Home page
  await page.getByRole("link", { name: "Home" }).click()

  await expect(page.getByRole("heading", { name: "Home page" })).toBeVisible()
  expect(page.url()).toBe(BASE_URL)

  // Admin page
  await page.goto("/admin")
  // Assert that the user is redirected to the home page, because he is not an admin
  expect(page.url()).toBe(BASE_URL)

  // Navigation through the settings
  // Profile page
  await page.getByLabel("Open settings").click()
  await page.getByRole("link", { name: "Profile" }).click()

  await expect(
    page.getByRole("heading", { name: "Profile page" })
  ).toBeVisible()
  expect(page.url()).toContain("/profile")

  // Logout
  await page.getByLabel("Open settings").click()
  await page.getByRole("link", { name: "Logout" }).click()

  // Back to intial state, not settings button, no admin, no profile, no my recipes links
  await expect(page.getByLabel("Open settings")).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Admin" })).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Profile" })).not.toBeAttached()
  await expect(
    page.getByRole("link", { name: "My recipes" })
  ).not.toBeAttached()
  expect(page.url()).toBe(BASE_URL)
})

/**
 * Test the authentication flow with a admin user
 * - Login
 * - Access the profile page
 * - Access the my recipes page
 * - Access the admin page
 * - Logout
 */
test("Test website navigation flow with admin user", async ({ page }) => {
  await page.goto("")

  // Initially, no settings button, no admin, no profile, no my recipes links
  await expect(page.getByLabel("Open settings")).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Admin" })).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Profile" })).not.toBeAttached()
  await expect(
    page.getByRole("link", { name: "My recipes" })
  ).not.toBeAttached()

  // Login
  await page.getByRole("heading", { name: "Home page" }).click()
  await page.getByRole("link", { name: "Sign in" }).click()
  await page.getByTestId("auth-email-field").click()
  await page.getByTestId("auth-email-field").fill(env.ADMIN_USER.email)
  await page.getByTestId("auth-submit-button").click()
  await page.getByLabel("Password", { exact: true }).click()
  await page
    .getByLabel("Password", { exact: true })
    .fill(env.ADMIN_USER.password)
  await page.getByRole("button", { name: "Continue" }).click()

  // After login, Settings button is visible
  // Because the user is an admin user, he can access the admin page
  await expect(page.getByLabel("Open settings")).toBeVisible()
  await expect(page.getByText("Home page")).toBeVisible()
  await expect(page.getByRole("link", { name: "Admin" })).toBeAttached()
  expect(page.url()).toBe(BASE_URL)

  // Navigation through the NavBar links
  // My recipes page
  await page.getByRole("link", { name: "My recipes" }).click()

  await expect(page.getByRole("heading", { name: "My Recipes" })).toBeVisible()
  expect(page.url()).toContain("/my-recipes")

  // Admin page
  await page.getByRole("link", { name: "Admin" }).click()

  await expect(page.getByRole("heading", { name: "Admin page" })).toBeVisible()
  expect(page.url()).toContain("/admin")

  // Home page
  await page.getByRole("link", { name: "Home" }).click()

  await expect(page.getByRole("heading", { name: "Home page" })).toBeVisible()
  expect(page.url()).toBe(BASE_URL)

  // Navigation through the settings
  // Profile page
  await page.getByLabel("Open settings").click()
  await page.getByRole("link", { name: "Profile" }).click()

  await expect(
    page.getByRole("heading", { name: "Profile page" })
  ).toBeVisible()
  expect(page.url()).toContain("/profile")

  // Logout
  await page.getByLabel("Open settings").click()
  await page.getByRole("link", { name: "Logout" }).click()

  // Back to intial state, not settings button, no admin, no profile, no my recipes links
  await expect(page.getByLabel("Open settings")).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Admin" })).not.toBeAttached()
  await expect(page.getByRole("link", { name: "Profile" })).not.toBeAttached()
  await expect(
    page.getByRole("link", { name: "My recipes" })
  ).not.toBeAttached()
  expect(page.url()).toBe(BASE_URL)
})
