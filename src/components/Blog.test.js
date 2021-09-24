import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

test('renders content title', () => {
  const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'test.blog.com'
  }

  const component = render(
    <div key={blog.id} className="blog">
      <Blog blog={blog} />
    </div>
  )

  expect(component.container).toHaveTextContent(
    'test blog title'
  )
})

test('renders content author', () => {
  const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'test.blog.com'
  }

  const component = render(
    <div key={blog.id} className="blog">
      <Blog blog={blog} />
    </div>
  )

  expect(component.container).toHaveTextContent(
    'test blog author'
  )
})

test('clicking button shows likes', () => {
  const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'test.blog.com'
  }

  const mockHandler = jest.fn()

  const component = render(
    <div key={blog.id} className="blog">
      <Blog blog={blog} />
      <Togglable buttonLabel="View">
        <BlogDetails blog={blog} updatedLikesBlog={mockHandler} deleteBlogById={mockHandler} />
      </Togglable>
    </div>
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'likes'
  )
})

test('clicking button shows likes', () => {
  const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'test.blog.com'
  }

  const mockHandler = jest.fn()

  const component = render(
    <div key={blog.id} className="blog">
      <Blog blog={blog} />
      <Togglable buttonLabel="View">
        <BlogDetails blog={blog} updatedLikesBlog={mockHandler} deleteBlogById={mockHandler} />
      </Togglable>
    </div>
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'test.blog.com'
  )
})
