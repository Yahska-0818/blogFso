import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import BlogForm from './BlogForm'

test('calls addBlog with right details when form is submitted', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()
  
  const MockEnvironment = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
      <BlogForm
        addBlog={addBlog}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        title={title}
        author={author}
        url={url}
        testUser={true}
      />
    )
  }

  render(<MockEnvironment />)

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'My new blog')
  await user.type(inputs[1], 'John Doe')
  await user.type(inputs[2], 'https://blog.com')

  await user.click(screen.getByRole('button', { type: 'submit' }))

  expect(addBlog).toHaveBeenCalledTimes(1)
  expect(addBlog).toHaveBeenCalledWith({
    title: 'My new blog',
    author: 'John Doe',
    url: 'https://blog.com',
  })
})
