import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

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