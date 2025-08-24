import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: "Checking rendering",
    author: "FSO",
    url: "fso.com",
    likes: 0,
    showFull: false
  }

  render(<Blog blog={blog} blogs={[blog]} setBlogs={() => {}} />)
  const element = screen.getByText("Checking rendering FSO")
  expect(element).toBeDefined()
  expect(screen.queryByText('fso.com')).toBeNull()
  expect(screen.queryByText('likes')).toBeNull()
})