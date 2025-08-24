import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

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

test('view button renders all content', async () => {
  const blog = {
    title: "Checking rendering",
    author: "FSO",
    url: "fso.com",
    likes: 0,
    showFull: false
  }

  const VirtualBlogsEnv = () => {
    const [blogs,setBlogs] = useState([blog])
    return (<Blog blog={blogs[0]} blogs={blogs} setBlogs={setBlogs}/>)
  }
  const user = userEvent.setup()
  render(<VirtualBlogsEnv/>)

  expect(screen.queryByText('fso.com')).toBeNull()
  expect(screen.queryByText('likes')).toBeNull()

  await user.click(screen.getByText('View'))

  expect(screen.getByText((content) => content.includes('fso.com'))).toBeDefined()
  expect(screen.getByText((content) => content.includes('likes'))).toBeDefined()
})

test('like prop is clicked twice', async () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test.com',
    likes: 0,
    showFull: true
  }

  const mockLike = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog blog={blog} blogs={[blog]} setBlogs={() => {}} mockLike={mockLike} />
  )

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})