import { Observable } from './Observable'
import { describe, expect, test, beforeEach, afterEach } from '@jest/globals'
import { fn, Mock } from 'jest-mock'

let ob: Observable
let mock: Mock<any, [p: any]>
let f: any
let g: any
let e: any
beforeEach(() => {
  ob = new Observable()
  mock = fn((p: any) => p)
  f = () => mock('f')
  g = () => mock('g')
  e = () => {
    throw new Error()
  }
})

test('Call one observer', () => {
  ob.addObserver(mock)
  ob.notifyObservers()
  expect(mock.mock.calls).toHaveLength(1)
  expect(mock.mock.results[0].value).toBeUndefined()
})

test('Call several observers in correct order', () => {
  ob.addObserver(f)
  ob.addObserver(g)
  ob.notifyObservers()
  expect(mock.mock.calls).toHaveLength(2)
  expect(mock.mock.results[0].value).toEqual('f')
  expect(mock.mock.results[1].value).toEqual('g')
})

test('Remove observer', () => {
  ob.addObserver(f)
  ob.addObserver(g)
  ob.removeObserver(g)
  ob.notifyObservers()
  expect(mock.mock.calls).toHaveLength(1)
  expect(mock.mock.results[0].value).toEqual('f')
})

test('Remove all observers', () => {
  ob.addObserver(f)
  ob.addObserver(g)
  ob.removeObserver(f)
  ob.removeObserver(g)
  ob.notifyObservers()
  expect(mock.mock.calls).toHaveLength(0)
})

test('One observer throws', () => {
  ob.addObserver(e)
  ob.addObserver(f)
  ob.addObserver(g)
  ob.notifyObservers()
  expect(mock.mock.calls).toHaveLength(2)
})
