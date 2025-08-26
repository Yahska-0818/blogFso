import { test, expect } from '@playwright/test'

test.describe('Login tests', () => {
  test('user can login with correct password', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await expect(page.getByText('Log in to application')).toBeVisible()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('playwright')
    await textboxes[1].fill('test')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Logged in with playwright')).toBeVisible()
  })
  test('user cannot login with incorrect password', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await expect(page.getByText('Log in to application')).toBeVisible()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('playwright')
    await textboxes[1].fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })
})