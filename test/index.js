import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const sandbox = chai.spy.sandbox()

import { mockMarketServer } from './mock-servers'

import Bitex from '../src'
import {
  Account,
  Ask,
  Bank,
  Bid,
  Candle,
  CashDeposit,
  CashDepositMethod,
  CashWithdrawal,
  CoinWithdrawal,
  ContactRequest,
  Country,
  Emission,
  Market,
  Movement,
  Notification,
  Orderbook,
  OrderGroup,
  Purchase,
  PurchaseIntention,
  Reception,
  Sale,
  Ticker,
  Transaction,
  User,
  UserCoinAddressBookEntry,
  WithdrawalInstruction
} from '../src/models'

describe('bitex-js', () => {
  let client

  beforeEach(() => {
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('Market', () => {
    beforeEach(() => {
      mockMarketServer()
    })

    it('should get public market data', async () => {
      const market = await client.getMarket('btc_usd')
      expect(market).to.be.an.instanceof(Market)
      expect(market.candles.length).to.equal(1)
      expect(market.candles[0]).to.be.an.instanceof(Candle)
      expect(market.bids.length).to.equal(1)
      expect(market.bids[0]).to.be.an.instanceof(OrderGroup)
      expect(market.asks.length).to.equal(0)
    })

    it('should get market ticker', async () => {
      const ticker = await client.getTicker('btc_usd')
      expect(ticker).to.be.an.instanceof(Ticker)
      expect(ticker.last).to.equal(200)
    })

    it('should get public market transactions', async () => {
      const transactions = await client.getTransactions('bch_usd')
      expect(transactions.length).to.equal(1)
      expect(transactions[0]).to.be.an.instanceof(Transaction)
      expect(transactions[0].price).to.equal(1222)
    })

    it('should get public market candles', async () => {
      const candles = await client.getCandles('btc_usd')
      expect(candles.length).to.equal(1)
      expect(candles[0]).to.be.an.instanceof(Candle)
      expect(candles[0].low).to.equal(100)
      expect(candles[0].open).to.equal(200)
      expect(candles[0].close).to.equal(300)
      expect(candles[0].high).to.equal(400)
      expect(candles[0].volume).to.equal(10)
    })

    it('should be able to put an ask', async () => {
      const newAsk = await client.createAsk('btc_usd', 150, 1.2)
      expect(newAsk).to.be.an.instanceof(Ask)
      expect(newAsk.id).to.equal('57')
      expect(newAsk.user.id).to.equal('8')
      expect(newAsk.orderbook.id).to.equal('1')
    })

    it('should be able to put a bid', async () => {
      const newBid = await client.createBid('btc_usd', 12, 100)
      expect(newBid).to.be.an.instanceof(Bid)
      expect(newBid.id).to.equal('70')
      expect(newBid.user.id).to.equal('8')
      expect(newBid.orderbook.id).to.equal('1')
    })
  })
})
