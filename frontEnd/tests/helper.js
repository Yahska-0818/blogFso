const loginWith = async (page, username, password)  => {
  const loginTextboxes = await page.getByRole('textbox').all()
  await loginTextboxes[0].fill(username)
  await loginTextboxes[1].fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const makeBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create New Blog' }).click()
  const blogTextBoxes = await page.getByRole('textbox').all()
  await blogTextBoxes[0].fill(title)
  await blogTextBoxes[1].fill(author)
  await blogTextBoxes[2].fill(url)
  await page.getByRole('button', { name: 'Save' }).click()
}


export { loginWith, makeBlog }