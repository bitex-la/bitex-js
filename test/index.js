import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const sandbox = chai.spy.sandbox()

import { mockMarketServer } from './mock-servers'

import Bitex from '../src'
import {
  Market,
  OrderGroup,
  Ask,
  Bid,
  Orderbook,
  Movement,
  Account,
  User,
  PurchaseIntention,
  Purchase,
  Sale,
  Reception,
  Emission,
  CoinWithdrawal,
  UserCoinAddressBookEntry,
  CashWithdrawal,
  Bank,
  WithdrawalInstruction,
  Notification,
  CashDeposit,
  CashDepositMethod,
  Ticker,
  Candle,
  ContactRequest,
  Country
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
  })
})
