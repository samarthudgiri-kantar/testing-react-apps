// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import { render, screen, act } from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })

jest.mock('react-use-geolocation')

// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return { promise, resolve, reject }
// }


test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  // const { promise, resolve } = deferred()
  // window.navigator.geolocation.getCurrentPosition.mockImplementation(
  //   callback => {
  //     promise.then(() => callback(fakePosition))
  //   },
  // )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // await act(async () => {
  //   resolve()
  //   await promise
  // })
  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
