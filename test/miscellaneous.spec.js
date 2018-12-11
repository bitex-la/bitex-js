import chai, { expect, assert } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  Account,
  Movement
} from '../src/models'

describe('Miscellaneous', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/miscellaneous/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('get movements', async () => {
    const movements = await client.getMovements()
    expect(movements.length).to.equal(5)
    movements.every(m => expect(m).to.be.an.instanceof(Movement))
  })

  it('get account', async () => {
    const account = await client.getAccount()
    expect(account).to.be.an.instanceof(Account)
    expect(_.keys(account.balances)).to.eql(
      ['btc', 'usd', 'ars', 'clp', 'bch', 'pyg', 'uyu'])
  })
})
