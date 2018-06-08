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
      const market = await client.getTransactions('bch_usd')
      expect(market).to.be.an.instanceof(Market)
      expect(market.transactions.length).to.equal(1)
      expect(market.transactions[0]).to.be.an.instanceof(Transaction)
      expect(market.transactions[0].price).to.equal(1222)
    })
  })
})
