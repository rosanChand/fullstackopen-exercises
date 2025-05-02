import {render , screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
test('Blog only render title and author', () => {
  const blog = {
    title: "test blog",
    author: "test author",
    url: "facebook.com",
    likes: 1,
    user: {
      name: 'dummy'
    }
  }
  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()
  
  const {container}= render(
    <Blog blog={blog} handleLike={mockHandleLike} handleDelete={mockHandleDelete} />
  )
  const element = container.querySelector('.blog-test')

  expect(element).toHaveTextContent(
    'test blog'
  )
  expect(element).toHaveTextContent(
    'test author'
  )
  expect(element).not.toHaveTextContent(
    'facebook.com'
  )
  expect(element).not.toHaveTextContent(
    1
  )
})

test('clicking view button shows url and likes', async() => {
  const blog = {
    title: "test blog",
    author: "test author",
    url: "facebook.com",
    likes: 1,
    user: {
      name: 'dummy'
    }
  }
  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandleLike} handleDelete={mockHandleDelete} />
  )
  const viewButton = component.getByText('view')
  const user = userEvent.setup()

  await user.click(viewButton)
  expect(component.container).toHaveTextContent(
    'facebook.com'
  )
  expect(component.container).toHaveTextContent(
    1
  )
  
})
test('when ilke button is clicked twice handleLike is called twice',async() => {
  const blog = {
    title: "test blog",
    author: "test author",
    url: "facebook.com",
    likes: 1,
    user: {
      name: 'dummy'
    }
  }
  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandleLike} handleDelete={mockHandleDelete} />
  )
  const viewButton = component.getByText('view')
  const user = userEvent.setup()

  await user.click(viewButton)

  const likeButton = component.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandleLike.mock.calls).toHaveLength(2)
})