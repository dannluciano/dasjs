/* global fixture, test */

import { expect } from 'chai'

const url = 'http://localhost:5000'

fixture`Getting Started`.page(url)

test('Test Home Page', async t => {
  const title = await t.eval(() => document.title)
  const titleExpected = 'Dropbox Auth System'
  expect(title)
    .to.equal(titleExpected)
})

fixture`Sign In`.page(url + '/users/new')

test('Test Sign In With Invalid Data', async t => {
  await t
    .typeText('#email', `admin@admin`)
    .typeText('#username', `admin`)
    .typeText('#password', '123456')
    .click('#submit')

  const urlExpected = '/users/new'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})

test('Test Sign In With Valid Data', async t => {
  const randUser = Math.round(Math.random() * 1000)
  await t
    .typeText('#email', `admin${randUser}@admin`)
    .typeText('#username', `admin${randUser}`)
    .typeText('#password', '123456')
    .click('#submit')

  const urlExpected = '/'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})

fixture`Authentication`.page(url + '/auth/login')

test('Test Login In With Invalid Data', async t => {
  await t
    .typeText('#username', '@dmin')
    .typeText('#password', '654321')
    .click('#submit')

  const urlExpected = '/auth/login'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})

test('Test Login In With Valid Data', async t => {
  await t
    .typeText('#username', 'admin')
    .typeText('#password', '123456')
    .click('#submit')

  const urlExpected = '/'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})

test('Test Logout', async t => {
  await t
    .typeText('#username', 'admin')
    .typeText('#password', '123456')
    .click('#submit')
    .navigateTo('/users/admin')
    .click('#logout')

  const urlExpected = '/'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})

fixture`Admin Page`.page(url + '/auth/login')

test('Test Admin Page With Valid Data', async t => {
  await t
    .typeText('#username', 'admin')
    .typeText('#password', '123456')
    .click('#submit')
    .navigateTo('/users/')

  const urlExpected = '/users/'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})

test('Test Admin Page With Invalid Data', async t => {
  await t
    .typeText('#username', 'dannluciano')
    .typeText('#password', '123456')
    .click('#submit')
    .navigateTo('/users/')

  const urlExpected = '/auth/login'
  const url = await t.eval(() => document.location.pathname)
  expect(url)
    .to.equal(urlExpected)
})
