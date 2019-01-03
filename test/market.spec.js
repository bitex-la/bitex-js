import { expect, assert } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex, { Orderbooks } from '../src'
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
    const market = await client.getMarket(Orderbooks.BTCUSD)
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
    const ticker = await client.getTicker(Orderbooks.BTCUSD)
    expect(ticker).to.be.an.instanceof(Ticker)
  })

  it('get transactions', async () => {
    const transactions = await client.getTransactions()
    transactions.every(t => expect(t).to.be.an.instanceof(Transaction))
  })

  it('get transactions of one orderbook', async () => {
    const transactions = await client.getTransactions(Orderbooks.BTCUSD)
    transactions.every(t => {
      return expect(t).to.be.an.instanceof(Transaction) &&
      expect(t.orderbook_code).to.eq(Orderbooks.BTCUSD)
    })
  })

  it('get transactions in btcusd of last hour', async () => {
    const transactions = await client.getTransactions(Orderbooks.BTCUSD, 1)
    transactions.every(t => {
      return expect(t).to.be.an.instanceof(Transaction) &&
      expect(t.orderbook_code).to.eq(Orderbooks.BTCUSD)
    })
  })

  it('get transaction', async () => {
    const transaction = await client.getTransaction(70)
    expect(transaction).to.be.an.instanceof(Transaction)
    assert.equal(transaction.id, 70)
  })

  it('get candles', async () => {
    const candles = await client.getCandles()
    candles.every(c => expect(c).to.be.an.instanceof(Candle))
  })

  it('get candles of one orderbook', async () => {
    const candles = await client.getCandles(Orderbooks.BTCUSD)
    candles.every(c => {
      return expect(c).to.be.an.instanceof(Candle) &&
      expect(c.orderbook_code).to.eq(Orderbooks.BTCUSD)
    })
  })

  it('get daily candles', async () => {
    const candles = await client.getCandles(null, 1, 24)
    expect(candles.length).to.eq(6) //One for each active orderbook
    candles.every(c => {
      return expect(c).to.be.an.instanceof(Candle)
    })
  })

  it('get orderbooks', async () => {
    const orderbooks = await client.getOrderbooks()
    orderbooks.every(o => expect(o).to.be.an.instanceof(Orderbook))
  })
})
