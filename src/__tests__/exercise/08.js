// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// #1
// function UseCounterHookExample() {
//   const {count, increment, decrement} = useCounter()
//   return (
//     <div>
//       <div>Current count: {count}</div>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={increment}>Increment</button>
//     </div>
//   )
// }

// #3
// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter(initialProps)
//     return null
//   }
//   render(<TestComponent />)
//   return result
// }

test('exposes the count and increment/decrement functions', async () => {

  // #3
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

  // #2
  // let result
  // function TestComponent() {
  //   result = useCounter()
  //   return null
  // }
  // render(<TestComponent />)
  // expect(result.count).toBe(0)
  // act(() => result.increment())
  // expect(result.count).toBe(1)
  // act(() => result.decrement())
  // expect(result.count).toBe(0)

  // #1
  // render(<UseCounterHookExample />)
  // const increment = screen.getByRole('button', {name: /increment/i})
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const message = screen.getByText(/current count/i)

  // expect(message).toHaveTextContent('Current count: 0')
  // await userEvent.click(increment)
  // expect(message).toHaveTextContent('Current count: 1')
  // await userEvent.click(decrement)
  // expect(message).toHaveTextContent('Current count: 0')
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
