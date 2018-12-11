import chai, { expect, assert } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  Candle,
  Market,
  Orderbook,
  OrderGroup,
  Ticker,
  Transaction
} from '../src/models'

describe('Market', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/market/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('get market data', async () => {
    const market = await client.getMarket('btc_usd')
    expect(market).to.be.an.instanceof(Market)
    market.candles.every(candle => expect(candle).to.be.an.instanceof(Candle))
    market.bids.every(bid => expect(bid).to.be.an.instanceof(OrderGroup))
    market.asks.every(ask => expect(ask).to.be.an.instanceof(OrderGroup))
  })

  it('get all tickers', async () => {
    const tickers = await client.getTickers()
    expect(tickers.length).to.equal(6) //One for each active orderbook
    tickers.every(ticker => expect(ticker).to.be.an.instanceof(Ticker))
  })

  it('get ticker', async () => {
    const ticker = await client.getTicker('btc_usd')
    expect(ticker).to.be.an.instanceof(Ticker)
  })

  it('get transactions', async () => {
    const transactions = await client.getTransactions('btc_usd')
    expect(transactions.length).to.equal(2)
    transactions.every(t => {
      expect(t).to.be.an.instanceof(Transaction) &&
      expect(t.orderbook_code).to.eq('btc_usd')
    })
  })

  it('get transaction', async () => {
    const transaction = await client.getTransaction(70)
    expect(transaction).to.be.an.instanceof(Transaction)
    assert.equal(transaction.id, 70)
  })

  it('get candles', async () => {
    const candles = await client.getCandles('btc_usd')
    candles.every(c => expect(c).to.be.an.instanceof(Candle))
  })

  it('get orderbooks', async () => {
    const orderbooks = await client.getOrderbooks()
    orderbooks.every(o => expect(o).to.be.an.instanceof(Orderbook))
  })
})
