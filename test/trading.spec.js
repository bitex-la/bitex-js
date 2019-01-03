import { expect } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex, { Orderbooks } from '../src'
import {
  Ask,
  Bid,
  Buy,
  Sell
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
    const newAsk = await client.createAsk(Orderbooks.BTCUSD, 150, 1.2)
    expect(newAsk).to.be.an.instanceof(Ask)
    expect(newAsk.id).to.not.be.null
  })

  it('get asks', async () => {
    const asks = await client.getAsks()
    expect(asks.length).to.equal(3)
    asks.every(a => expect(a).to.be.an.instanceof(Ask))
  })

  it('get asks btcusd', async () => {
    const asks = await client.getAsks(Orderbooks.BTCUSD)
    expect(asks.length).to.equal(2)
    asks.every(a => expect(a).to.be.an.instanceof(Ask))
  })

  it('get ask', async () => {
    const ask = await client.getAsk(16)
    expect(ask).to.be.an.instanceof(Ask)
  })

  it('cancel ask', async () => {
    const response = await client.cancelAsk(13)
    expect(response).to.be.empty
  })

  it('create bid', async () => {
    const newBid = await client.createBid(Orderbooks.BTCUSD, 12, 100)
    expect(newBid).to.be.an.instanceof(Bid)
    expect(newBid.id).to.not.be.null
  })

  it('get bids', async () => {
    const bids = await client.getBids()
    expect(bids.length).to.equal(2)
    bids.every(b => expect(b).to.be.an.instanceof(Bid))
  })

  it('get bids btcars', async () => {
    const bids = await client.getBids(Orderbooks.BTCARS)
    expect(bids.length).to.equal(1)
    bids.every(b => expect(b).to.be.an.instanceof(Bid))
  })

  it('get bid', async () => {
    const bid = await client.getBid(34)
    expect(bid).to.be.an.instanceof(Bid)
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
    const response = await client.cancelOrders(Orderbooks.BTCUSD)
    expect(response).to.be.empty
  })

  it('get all trades', async () => {
    const trades = await client.getTrades()
    expect(trades.length).to.equal(5)
    trades.every(o => expect(o).to.satisfy(
      o => o instanceof Buy || o instanceof Sell
    ))
  })

  it('get all trades in an orderbook', async () => {
    const trades = await client.getTrades(Orderbooks.BTCUSD)
    expect(trades.length).to.equal(2)
    trades.every(o => expect(o.orderbook_code).to.equal(Orderbooks.BTCUSD))
  })

  it('get all trades from thirty days ago', async () => {
    const trades = await client.getTrades(null, 30)
    expect(trades.length).to.equal(4)
  })

  it('get last two trades', async () => {
    const trades = await client.getTrades(null, null, 2)
    expect(trades.length).to.equal(2)
  })

  it('get all buys', async () => {
    const buys = await client.getBuys()
    expect(buys.length).to.equal(5)
    buys.every(b => expect(b).to.be.an.instanceof(Buy))
  })

  it('get all buys in an orderbook', async () => {
    const buys = await client.getBuys(Orderbooks.BTCUSD)
    expect(buys.length).to.equal(2)
    buys.every(o => expect(o.orderbook_code).to.equal(Orderbooks.BTCUSD))
  })

  it('get all buys from thirty days ago', async () => {
    const buys = await client.getBuys(null, 30)
    expect(buys.length).to.equal(4)
  })

  it('get last two buys', async () => {
    const buys = await client.getBuys(null, null, 2)
    expect(buys.length).to.equal(2)
  })

  it('get all sells', async () => {
    const sells = await client.getSells()
    expect(sells.length).to.equal(5)
    sells.every(s => expect(s).to.be.an.instanceof(Sell))
  })

  it('get all sells in an orderbook', async () => {
    const sells = await client.getSells(Orderbooks.BTCUSD)
    expect(sells.length).to.equal(2)
    sells.every(o => expect(o.orderbook_code).to.equal(Orderbooks.BTCUSD))
  })

  it('get all sells from thirty days ago', async () => {
    const sells = await client.getSells(null, 30)
    expect(sells.length).to.equal(4)
  })

  it('get last two sells', async () => {
    const sells = await client.getSells(null, null, 2)
    expect(sells.length).to.equal(2)
  })
})
