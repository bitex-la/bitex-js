import chai, { expect } from 'chai'
chai.use(require('chai-as-promised'))

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'

describe('Unhappy paths', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/unhappy_paths/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title), true)
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('handles 404 errors gracefully', () => {
    expect(client.getMarket('unexistent_orderbook')).to.be.rejectedWith(Error)
  })

  it('handles unauthorized errors gracefully', () => {
    expect(client.createApiKey(true, 'wrong_otp')).to.be.rejectedWith(Error)
  })
})
