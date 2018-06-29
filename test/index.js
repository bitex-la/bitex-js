import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const sandbox = chai.spy.sandbox()

import _ from 'lodash'

import { mockMarketServer, mockFundingServer, mockBotsServer, mockMerchantServer } from './mock-servers'

import Bitex from '../src'
import {
  Account,
  Ask,
  AssetWallet,
  Bank,
  Bid,
  BitcoinAddress,
  BuyingBot,
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
  Order,
  Orderbook,
  OrderGroup,
  Payment,
  POS,
  Purchase,
  PurchaseIntention,
  Reception,
  Sale,
  SellingBot,
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

    it('should be able to get all Orders', async () => {
      const orders = await client.getOrders()
      expect(orders.length).to.equal(3)
      expect(orders[0]).to.be.an.instanceof(Bid)
      expect(orders[0].orderbook).to.be.an.instanceof(Orderbook)
      expect(orders[0].orderbook.code).to.equal('btc_usd')
      expect(orders[1]).to.be.an.instanceof(Bid)
      expect(orders[1].orderbook).to.be.an.instanceof(Orderbook)
      expect(orders[1].orderbook.code).to.equal('bch_usd')
      expect(orders[2]).to.be.an.instanceof(Ask)
      expect(orders[2].orderbook).to.be.an.instanceof(Orderbook)
      expect(orders[2].orderbook.code).to.equal('btc_usd')
    })

    it('should be able to cancel all Orders', async () => {
      const response = await client.cancelOrders()
      expect(response).to.equal('')
    })

    it('should be able to cancel all Orders in an orderbook', async () => {
      const response = await client.cancelOrders('btc_usd')
      expect(response).to.equal('')
    })

    it('should be able to get all Orderbooks', async () => {
      const orderbooks = await client.getOrderbooks()
      expect(orderbooks.length).to.equal(3)
      expect(orderbooks[0]).to.be.an.instanceof(Orderbook)
      expect(orderbooks[0].code).to.equal('btc_usd')
      expect(orderbooks[1]).to.be.an.instanceof(Orderbook)
      expect(orderbooks[1].code).to.equal('btc_ars')
      expect(orderbooks[2]).to.be.an.instanceof(Orderbook)
      expect(orderbooks[2].code).to.equal('bch_usd')
    })

    it('should be able to get users movements', async () => {
      const movements = await client.getMovements()
      expect(movements.length).to.equal(5)
      expect(movements[0]).to.be.an.instanceof(Movement)
      expect(movements[0].kind).to.equal('Buy')
      expect(movements[1]).to.be.an.instanceof(Movement)
      expect(movements[1].kind).to.equal('Sell')
      expect(movements[2]).to.be.an.instanceof(Movement)
      expect(movements[2].kind).to.equal('CashDeposit')
      expect(movements[3]).to.be.an.instanceof(Movement)
      expect(movements[3].kind).to.equal('CoinWithdrawal')
      expect(movements[4]).to.be.an.instanceof(Movement)
      expect(movements[4].kind).to.equal('CoinDeposit')
    })

    it('should be able to get user account', async () => {
      const account = await client.getAccount()
      expect(account).to.be.an.instanceof(Account)
      expect(_.keys(account.balances)).to.eql(['btc', 'usd', 'ars', 'clp', 'bch'])
      expect(account.movements.length).to.equal(0)
      expect(account.pending_movements.length).to.equal(1)
      expect(account.pending_movements[0]).to.be.an.instanceof(PurchaseIntention)
      expect(account.pending_movements[0].requested_amount).to.equal(123)
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

    it('should be able to create a cash withdrawal', async () => {
      let instructions = new WithdrawalInstruction()
      instructions.id = 10
      instructions.label = 'Local Bank'

      const newCashWithdrawal = await client.createCashWithdrawal('ars', 100, instructions)
      expect(newCashWithdrawal).to.be.an.instanceof(CashWithdrawal)
      expect(newCashWithdrawal.amount).to.equal(100)
      expect(newCashWithdrawal.status).to.equal('received')
      expect(newCashWithdrawal.currency).to.equal('ARS')
      expect(newCashWithdrawal.payment_method).to.equal('domestic_bank')
      expect(newCashWithdrawal.label).to.equal('Local Bank')
      expect(newCashWithdrawal.withdrawal_instruction).to.be.an.instanceof(WithdrawalInstruction)
    })

    it('should be able to create new withdrawal instructions', async () => {
      const label = 'Local Bank'
      const body = {
        name: "John Doe",
        city: "Buenos Aires",
        phone: "12341234",
        cuit: "12341234",
        address: "My Address 123",
        bank: "hsbc",
        bank_account_number: "12341234",
        cbu: "1234123412341234",
        account_type: "savings",
        currency: "ARS",
        country: "AR",
        payment_method: "domestic_bank"
      }

      const newWithdrawalInstruction = await client.createWithdrawalInstructions(label, body)
      expect(newWithdrawalInstruction).to.be.an.instanceof(WithdrawalInstruction)
      expect(newWithdrawalInstruction.id).to.equal('23')
    })

    it('should be able to list withdrawal instructions', async () => {
      const withdrawalInstructions = await client.getWithdrawalInstructions()
      expect(withdrawalInstructions.length).to.equal(2)
      expect(withdrawalInstructions[0]).to.be.an.instanceof(WithdrawalInstruction)
      expect(withdrawalInstructions[0].body.payment_method).to.equal('third_party')
      expect(withdrawalInstructions[1]).to.be.an.instanceof(WithdrawalInstruction)
      expect(withdrawalInstructions[1].body.payment_method).to.equal('domestic_bank')
    })

    it('should be able to delete a withdrawal instruction', async () => {
      //Should not throw an exception
      const result = await client.deleteWithdrawalInstructions('12')
      expect(result).to.equal('')
    })

    it('should be able to create a coin withdrawal', async () => {
      const newCoinWithdrawal = await client.createCoinWithdrawal('btc', 12.3456789, 'Trezor', 'mszEUK9E6E7n4SNcrjYH8Fr7ZTGP9n3dRb')
      expect(newCoinWithdrawal).to.be.an.instanceof(CoinWithdrawal)
      expect(newCoinWithdrawal.id).to.equal('41')
      expect(newCoinWithdrawal.amount).to.equal(12.3456789)
      expect(newCoinWithdrawal.status).to.equal('received')
    })
  })

  describe('Buying/Selling Bots', () => {
    beforeEach(() => {
      mockBotsServer()
    })

    it('should be able to get created buying bots', async () => {
      const buyingBots = await client.getBuyingBots()
      expect(buyingBots.length).to.equal(1)
      expect(buyingBots[0]).to.be.an.instanceof(BuyingBot)
      expect(buyingBots[0].amount).to.equal(100)
      expect(buyingBots[0].orderbook.id).to.equal('1')
    })

    it('should be able to get created buying bot', async () => {
      const buyingBot = await client.getBuyingBot(1)
      expect(buyingBot).to.be.an.instanceof(BuyingBot)
      expect(buyingBot.amount).to.equal(100)
      expect(buyingBot.orderbook.id).to.equal('1')
    })

    it('should be able to create a buying bot', async () => {
      const buyingBot = await client.createBuyingBot(100, '1')
      expect(buyingBot).to.be.an.instanceof(BuyingBot)
      expect(buyingBot.id).to.equal('1')
      expect(buyingBot.amount).to.equal(100)
      expect(buyingBot.executing).to.equal(true)
    })

    it('should be able to cancel a buying bot', async () => {
      const buyingBot = await client.cancelBuyingBot(1)
      expect(buyingBot).to.be.an.instanceof(BuyingBot)
      expect(buyingBot.id).to.equal('1')
      expect(buyingBot.amount).to.equal(100)
      expect(buyingBot.to_cancel).to.equal(true)
    })

    it('should be able to get created selling bots', async () => {
      const sellingBots = await client.getSellingBots()
      expect(sellingBots.length).to.equal(1)
      expect(sellingBots[0]).to.be.an.instanceof(SellingBot)
      expect(sellingBots[0].amount).to.equal(100)
      expect(sellingBots[0].orderbook.id).to.equal('1')
    })

    it('should be able to get created selling bot', async () => {
      const sellingBot = await client.getSellingBot(1)
      expect(sellingBot).to.be.an.instanceof(SellingBot)
      expect(sellingBot.amount).to.equal(100)
      expect(sellingBot.orderbook.id).to.equal('1')
    })

    it('should be able to create a selling bot', async () => {
      const sellingBot = await client.createSellingBot(100, '1')
      expect(sellingBot).to.be.an.instanceof(SellingBot)
      expect(sellingBot.id).to.equal('1')
      expect(sellingBot.amount).to.equal(100)
      expect(sellingBot.executing).to.equal(true)
    })

    it('should be able to cancel a selling bot', async () => {
      const sellingBot = await client.cancelSellingBot(1)
      expect(sellingBot).to.be.an.instanceof(SellingBot)
      expect(sellingBot.id).to.equal('1')
      expect(sellingBot.amount).to.equal(100)
      expect(sellingBot.to_cancel).to.equal(true)
    })
  })

  describe('Merchant', () => {
    beforeEach(() => {
      mockMerchantServer()
    })

    it('should be able to get all payments', async () => {
      const payments = await client.getPayments()
      expect(payments.length).to.equal(1)
      expect(payments[0]).to.be.an.instanceof(Payment)
      expect(payments[0].amount).to.equal(15)
      expect(payments[0].address).to.be.an.instanceof(BitcoinAddress)
      expect(payments[0].address.public_address).to.equal('mfYmtH9Pg8jyBmZ4mEajAPApsQXkjdR62q')
    })

    it('should be able to get a payment', async () => {
      const payment = await client.getPayment(1)
      expect(payment).to.be.an.instanceof(Payment)
      expect(payment.amount).to.equal(15)
      expect(payment.address).to.be.an.instanceof(BitcoinAddress)
      expect(payment.address.public_address).to.equal('mfYmtH9Pg8jyBmZ4mEajAPApsQXkjdR62q')
    })

    it('should be able to create a payment', async () => {
      const payment = await client.createPayment(200, 10, '1', 'https://mystore.com/webhook', 'Purchase at My Store', 'Sale id: 2212')
      expect(payment).to.be.an.instanceof(Payment)
      expect(payment.id).to.equal('3')
      expect(payment.amount).to.equal(200)
      expect(payment.currency).to.equal('btc')
      expect(payment.address.public_address).to.equal('mnB4AQSyFgM94Mw3EYJSHFeKsd6Stwor3Z')
    })

    it('should be able to create a point of sale', async () => {
      const pos = await client.createPOS(10, 'https://mystore.com/logo.png', 'My Store', 'https://mystore.com', 'my-store')
      expect(pos).to.be.an.instanceof(POS)
      expect(pos.id).to.equal('8')
      expect(pos.merchant_keep).to.equal(10)
    })
  })
})
