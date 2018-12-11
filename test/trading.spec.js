import chai, { expect, assert } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  Ask,
  Bid
} from '../src/models'

describe('Trading', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/trading/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('create ask', async () => {
    const newAsk = await client.createAsk('btc_usd', 150, 1.2)
    expect(newAsk).to.be.an.instanceof(Ask)
  })

  it('cancel ask', async () => {
    const response = await client.cancelAsk(13)
    expect(response).to.be.empty
  })

  it('create bid', async () => {
    const newBid = await client.createBid('btc_usd', 12, 100)
    expect(newBid).to.be.an.instanceof(Bid)
  })

  it('cancel bid', async () => {
    const response = await client.cancelBid(32)
    expect(response).to.be.empty
  })

  it('get all orders', async () => {
    const orders = await client.getOrders()
    expect(orders.length).to.equal(2)
    orders.every(o => expect(o).to.satisfy(
      o => o instanceof Bid || o instanceof Ask
    ))
  })

  it('cancel all orders', async () => {
    const response = await client.cancelOrders()
    expect(response).to.be.empty
  })

  it('cancel all orders in an orderbook', async () => {
    const response = await client.cancelOrders('btc_usd')
    expect(response).to.be.empty
  })
})
