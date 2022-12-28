// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import { act } from 'react-dom/test-utils'
// import { createRoot } from 'react-dom/client'
import { render, fireEvent } from '@testing-library/react';
import Counter from '../../components/counter'

global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)

  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')

  act(() => fireEvent.click(increment))
  expect(message).toHaveTextContent('Current count: 1')
  act(() => fireEvent.click(decrement))
  expect(message).toHaveTextContent('Current count: 0')
})
