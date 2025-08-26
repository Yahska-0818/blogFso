const loginWith = async (page, username, password)  => {
  const loginTextboxes = await page.getByRole('textbox').all()
  await loginTextboxes[0].fill(username)
  await loginTextboxes[1].fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const makeBlog = async(page) => {
  await page.getByRole('button', { name:'Create New Blog'}).click()
  const blogTextBoxes = await page.getByRole('textbox').all()
  await blogTextBoxes[0].fill('testing with playwright')
  await blogTextBoxes[1].fill('sHayak')
  await blogTextBoxes[2].fill('https://fullstackopen.com/en/part5/end_to_end_testing_playwright#exercises-5-17-5-23')
  await page.getByRole('button', { name:'Save'}).click()
}

export { loginWith, makeBlog }