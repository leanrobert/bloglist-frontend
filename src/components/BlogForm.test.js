import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('renders content title', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlogFun={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#form')

  fireEvent.change(title, {
    target: { value: 'form create test title' }
  })

  fireEvent.change(author, {
    target: { value: 'form create test author' }
  })

  fireEvent.change(url, {
    target: { value: 'form create test url' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('form create test author')
})
