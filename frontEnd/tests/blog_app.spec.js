import { test, expect } from '@playwright/test'
import { loginWith, makeBlog } from './helper'

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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Shayak2',
        username: 'secondUser',
        password: 'test'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('user can login with correct password', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('playwright')
    await textboxes[1].fill('test')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Logged in with playwright')).toBeVisible()
  })
  test('user cannot login with incorrect password', async ({ page }) => {
    await loginWith(page,'playwright','wrong')
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('user can create a blog', async ({page}) => {
    await loginWith(page,'playwright','test')
    await page.getByRole('button', { name:'Create New Blog'}).click()
    const blogTextBoxes = await page.getByRole('textbox').all()
    await blogTextBoxes[0].fill('testing with playwright')
    await blogTextBoxes[1].fill('sHayak')
    await blogTextBoxes[2].fill('https://fullstackopen.com/en/part5/end_to_end_testing_playwright#exercises-5-17-5-23')
    await page.getByRole('button', { name:'Save'}).click()
    await expect(page.getByText('testing with playwright sHayak')).toBeVisible()
  })

  test('user can like blogs', async ({page}) => {
    await loginWith(page,'playwright','test')
    await makeBlog(page,'testing with playwright','sHayak','https://fullstackopen.com')
    await page.getByRole('button',{name:'View'}).click()
    await expect(page.getByText('likes 0')).toBeVisible()
    await page.getByRole('button',{name:'like'}).click()
    await expect(page.getByText('likes 1')).toBeVisible()
  })
  test('user can delete blogs',async ({page}) => {
    await loginWith(page,'playwright','test')
    await makeBlog(page,'testing with playwright','sHayak','https://fullstackopen.com')
    await expect(page.getByText('testing with playwright sHayak')).toBeVisible()
    await page.getByRole('button',{name:'View'}).click()
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button',{name:'remove'}).click()
    await expect(page.getByText('testing with playwright sHayak')).not.toBeVisible()
  })
  test('remove button is only visible to user who created it', async ({page}) => {
    await loginWith(page,'playwright','test')
    await makeBlog(page,'testing with playwright','sHayak','https://fullstackopen.com')
    await expect(page.getByText('testing with playwright sHayak')).toBeVisible()
    await page.getByRole('button',{name:'View'}).click()
    await page.getByRole('button',{name:'remove'}).isVisible()
    await page.getByRole('button',{name:'Logout'}).click()
    await loginWith(page,'secondUser','test')
    await expect(page.getByText('testing with playwright sHayak')).toBeVisible()
    await page.getByRole('button',{name:'View'}).click()
    await page.getByRole('button',{name:'remove'}).isHidden()
  })
  test('blogs are sorted correctly',async ({page})=>{
    await loginWith(page,'playwright','test')
    await makeBlog(page,'testing with playwright','sHayak','https://fullstackopen.com')
    await makeBlog(page,'testing with playwright2','sHayak2','https://youtube.com')
    await makeBlog(page,'testing with playwright3','sHayak3','https://google.com')
    let listItems = await page.getByRole('listitem').all()
    console.log('before liking')
    for (let i = 0; i < listItems.length; i++) {
      const text = await listItems[i].textContent()
      console.log(text)
    }
    const blogToTest = listItems[1]
    const viewButton = blogToTest.getByRole('button', { name: 'View' })
    await viewButton.click()
    const likeButton = blogToTest.getByTestId('like-button')
    await likeButton.click()
    await page.getByRole('button',{name:"Hide"}).click()
    await page.waitForTimeout(1000);
    console.log('after liking')
    listItems = await page.getByRole('listitem').all()
    for (let i = 0; i < listItems.length; i++) {
      const text = await listItems[i].textContent()
      console.log(text)
    }
  })
})