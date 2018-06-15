import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const sandbox = chai.spy.sandbox()

import { mockMarketServer, mockFundingServer } from './mock-servers'

import Bitex from '../src'
import {
  Account,
  Ask,
  AssetWallet,
  Bank,
  Bid,
  CancelStatus,
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

    it('should be able to cancel an ask', async () => {
      const response = await client.cancelAsk(['70', '71'])
      expect(response.data.length).to.equal(2)
      expect(response.data[0].text).to.equal("conflict")
      expect(response.data[0].value).to.equal(false)
      expect(response.data[1].text).to.equal("not_found")
      expect(response.data[1].value).to.equal(true)
    })

    it('should be able to put a bid', async () => {
      const newBid = await client.createBid('btc_usd', 12, 100)
      expect(newBid).to.be.an.instanceof(Bid)
      expect(newBid.id).to.equal('70')
      expect(newBid.user.id).to.equal('8')
      expect(newBid.orderbook.id).to.equal('1')
    })

    it('should be able to cancel a bid', async () => {
      const response = await client.cancelBid(['70', '71'])
      expect(response.data.length).to.equal(2)
      expect(response.data[0].text).to.equal("conflict")
      expect(response.data[0].value).to.equal(false)
      expect(response.data[1].text).to.equal("not_found")
      expect(response.data[1].value).to.equal(true)
    })
  })

  describe('Funding', () => {
    beforeEach(() => {
      mockFundingServer()
    })

    it('should be able to create a cash deposit', async () => {
      const newCashDeposit = await client.createCashDeposit('ARS', 1000, 'debin')
      expect(newCashDeposit).to.be.an.instanceof(CashDeposit)
      expect(newCashDeposit.id).to.equal('80')
      expect(newCashDeposit.requested_amount).to.equal(1000)
      expect(newCashDeposit.requested_currency).to.equal('ARS')
      expect(newCashDeposit.deposit_method).to.equal('debin')
    })

    it('should be able to get the wallets for ', async () => {
      const assetWallets = await client.getAssetWallets()
      expect(assetWallets.length).to.equal(2)
      expect(assetWallets[0]).to.be.an.instanceof(AssetWallet)
      expect(assetWallets[0].currency).to.equal('btc')
      expect(assetWallets[1]).to.be.an.instanceof(AssetWallet)
      expect(assetWallets[1].currency).to.equal('bch')
    })
  })
})
