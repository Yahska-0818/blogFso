import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Shayak',
        username: 'playwright',
        password: 'test'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test.describe('Login form visibility and logins with correct/incorrect info', () => {
    test('user can login with correct password', async ({ page }) => {
      await expect(page.getByText('Log in to application')).toBeVisible()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('playwright')
      await textboxes[1].fill('test')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Logged in with playwright')).toBeVisible()
    })
    test('user cannot login with incorrect password', async ({ page }) => {

      await expect(page.getByText('Log in to application')).toBeVisible()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('playwright')
      await textboxes[1].fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
  
  test.describe('While logged in',()=> {
    test('user can create a blog', async ({page}) => {
      const loginTextboxes = await page.getByRole('textbox').all()
      await loginTextboxes[0].fill('playwright')
      await loginTextboxes[1].fill('test')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name:'Create New Blog'}).click()
      const blogTextBoxes = await page.getByRole('textbox').all()
      await blogTextBoxes[0].fill('testing with playwright')
      await blogTextBoxes[1].fill('sHayak')
      await blogTextBoxes[2].fill('https://fullstackopen.com/en/part5/end_to_end_testing_playwright#exercises-5-17-5-23')
      await page.getByRole('button', { name:'Save'}).click()
      await expect(page.getByText('testing with playwright sHayak')).toBeVisible()
    })
  })
})