/* global fixture, test */

import { expect } from 'chai'

fixture `Getting Started`.page('http://localhost:3000')

test('Test Home Page', async t => {
  const title = await t.eval(() => document.title)
  const titleExpected = 'Dropbox Auth System'
  expect(title).to.equal(titleExpected)
})

fixture `Sign In`.page('http://localhost:3000/users/new')

test('Test Sign In With Invalid Data', async t => {
  await t
    .typeText('#email', `admin@admin`)
    .typeText('#username', `admin`)
    .typeText('#password', '123456')
    .click('#submit')

  const urlExpected = '/users/new'
  const url = await t.eval(() => document.location.pathname)
  expect(url).to.equal(urlExpected)
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
  expect(url).to.equal(urlExpected)
})

fixture `Authentication`.page('http://localhost:3000/auth/login')

test('Test Login In With Invalid Data', async t => {
  await t
    .typeText('#username', '@dmin')
    .typeText('#password', '654321')
    .click('#submit')

  const urlExpected = '/auth/login'
  const url = await t.eval(() => document.location.pathname)
  expect(url).to.equal(urlExpected)
})

test('Test Login In With Valid Data', async t => {
  await t
    .typeText('#username', 'admin')
    .typeText('#password', '123456')
    .click('#submit')

  const urlExpected = '/'
  const url = await t.eval(() => document.location.pathname)
  expect(url).to.equal(urlExpected)
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
  expect(url).to.equal(urlExpected)
})
