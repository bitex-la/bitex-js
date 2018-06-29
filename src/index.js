import axios from 'axios'
import _ from 'lodash'
import JsonapiClient from 'heather-js'
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
} from './models'

export default class Bitex {
  constructor({apiKey, environment = 'production'}){
    const prefix = (environment !== 'production') ? environment + '.' : ''
    if(environment === 'test') process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

    this.client = new JsonapiClient(`https://${prefix}bitex.la/api`)
    this.client.setHeader('Authorization', apiKey)

    this.defineModels()
  }

  defineModels(){
    this.client.define(Account)
    this.client.define(Ask)
    this.client.define(AssetWallet)
    this.client.define(Bank)
    this.client.define(Bid)
    this.client.define(BitcoinAddress)
    this.client.define(BuyingBot)
    this.client.define(CancelStatus)
    this.client.define(Candle)
    this.client.define(CashDeposit)
    this.client.define(CashDepositMethod)
    this.client.define(CashWithdrawal)
    this.client.define(CoinWithdrawal)
    this.client.define(ContactRequest)
    this.client.define(Country)
    this.client.define(Emission)
    this.client.define(Market)
    this.client.define(Movement)
    this.client.define(Notification)
    this.client.define(Order)
    this.client.define(Orderbook)
    this.client.define(OrderGroup)
    this.client.define(Payment)
    this.client.define(POS)
    this.client.define(Purchase)
    this.client.define(PurchaseIntention)
    this.client.define(Reception)
    this.client.define(Sale)
    this.client.define(SellingBot)
    this.client.define(Ticker)
    this.client.define(Transaction)
    this.client.define(User)
    this.client.define(UserCoinAddressBookEntry)
    this.client.define(WithdrawalInstruction)
  }

  async getMarket(code){
    return this.client.find({type: Market, id: code})
  }

  async getTicker(code){
    return this.client.find({type: Market, id: code, customParams: {scope: 'ticker'}})
  }

  async getTransactions(code){
    return this.client.findAll({type: Transaction, orderbookCode: code}).then(
      (market) => {
        return market.transactions
      }
    )
  }

  async getCandles(code){
    return this.client.findAll({type: Candle, orderbookCode: code}).then(
      (market) => market.candles
    )
  }

  async createAsk(orderbookCode, price, amount){
    let ask = new Ask()
    ask.price = price
    ask.amount = amount

    return this.client.create({resource: ask, orderbookCode})
  }

  async cancelAsk(ids){
    const asks = ids.map((id) => {
      let ask = new Ask()
      ask.id = id
      return ask
    })

    //This parameter is ignored by the controller. In case this changes, we should
    //add the orderbook code as a parameter to this method.
    const orderbookCode = 'btc_usd'

    return this.client.customAction({type: Ask, action: 'cancel', resource: asks, orderbookCode})
  }

  async createBid(orderbookCode, price, amount){
    let bid = new Bid()
    bid.price = price
    bid.amount = amount

    return this.client.create({resource: bid, orderbookCode})
  }

  async cancelBid(ids){
    const bids = ids.map((id) => {
      let bid = new Bid()
      bid.id = id
      return bid
    })

    //This parameter is ignored by the controller. In case this changes, we should
    //add the orderbook code as a parameter to this method.
    const orderbookCode = 'btc_usd'

    return this.client.customAction({type: Bid, action: 'cancel', resource: bids, orderbookCode})
  }

  async getOrders(){
    return this.client.findAll({type: Order})
  }

  async cancelOrders(orderbookCode){
    let order = new Order()
    order.id = orderbookCode || 'all'
    return this.client.customAction({resource: order, action: 'cancel'})
  }

  async getOrderbooks(){
    return this.client.findAll({type: Orderbook})
  }

  async getMovements(){
    return this.client.findAll({type: Movement})
  }

  async getAccount(){
    return this.client.findAll({type: Account}).then((accounts) => accounts[0])
  }

  async createCashDeposit(currency, amount, method){
    let cashDeposit = new CashDeposit()
    cashDeposit.requested_amount = amount
    cashDeposit.requested_currency = currency
    cashDeposit.deposit_method = method

    return this.client.create({resource: cashDeposit})
  }

  async getAssetWallets(){
    return this.client.findAll({type: AssetWallet, customParams: {scope: 'exchange'}})
  }

  async createCashWithdrawal(currency, amount, instructions){
    let cashWithdrawal = new CashWithdrawal()
    cashWithdrawal.amount = amount
    cashWithdrawal.fiat = currency
    cashWithdrawal.withdrawal_instruction = instructions

    return this.client.create({resource: cashWithdrawal})
  }

  async createWithdrawalInstructions(label, body){
    let withdrawalInstruction = new WithdrawalInstruction()
    withdrawalInstruction.label = label
    withdrawalInstruction.body = body

    return this.client.create({resource: withdrawalInstruction})
  }

  async getWithdrawalInstructions(){
    return this.client.findAll({type: WithdrawalInstruction})
  }

  async deleteWithdrawalInstructions(id){
    let withdrawalInstruction = new WithdrawalInstruction()
    withdrawalInstruction.id = id
    return this.client.delete({resource: withdrawalInstruction})
  }

  async createCoinWithdrawal(currency, amount, label, address){
    let coinWithdrawal = new CoinWithdrawal()
    coinWithdrawal.amount = amount
    coinWithdrawal.currency = currency
    coinWithdrawal.label = label
    coinWithdrawal.to_addresses = address

    return this.client.create({resource: coinWithdrawal})
  }

  async getBuyingBots(){
    return this.client.findAll({type: BuyingBot})
  }

  async getBuyingBot(id){
    return this.client.find({type: BuyingBot, id})
  }

  async createBuyingBot(amount, orderbookId){
    let buyingBot = new BuyingBot()
    buyingBot.amount = amount
    let orderbook = new Orderbook()
    orderbook.id = orderbookId
    buyingBot.orderbook = orderbook

    return this.client.create({resource: buyingBot})
  }

  async cancelBuyingBot(buyingBotId){
    let buyingBot = new BuyingBot()
    buyingBot.id = buyingBotId
    return this.client.customAction({resource: buyingBot, action: 'cancel'}).then((response) => this.client.deserialize(response))
  }

  async getSellingBots(){
    return this.client.findAll({type: SellingBot})
  }

  async getSellingBot(id){
    return this.client.find({type: SellingBot, id})
  }

  async createSellingBot(amount, orderbookId){
    let sellingBot = new SellingBot()
    sellingBot.amount = amount
    let orderbook = new Orderbook()
    orderbook.id = orderbookId
    sellingBot.orderbook = orderbook

    return this.client.create({resource: sellingBot})
  }

  async cancelSellingBot(sellingBotId){
    let sellingBot = new SellingBot()
    sellingBot.id = sellingBotId
    return this.client.customAction({resource: sellingBot, action: 'cancel'}).then((response) => this.client.deserialize(response))
  }

  async getPayments(){
    return this.client.findAll({type: Payment})
  }

  async getPayment(id){
    return this.client.find({type: Payment, id})
  }

  async createPayment(amount, keep, currency, callback_url, customer_reference, merchant_reference){
    let payment = new Payment()
    payment.amount = amount
    payment.keep = keep
    payment.currency = currency
    payment.callback_url = callback_url
    payment.customer_reference = customer_reference
    payment.merchant_reference = merchant_reference

    return this.client.create({resource: payment})
  }

  async createPOS(merchant_keep, merchant_logo, merchant_name, merchant_site, merchant_slug){
    let pos = new POS()
    pos.merchant_keep = merchant_keep
    pos.merchant_logo = merchant_logo
    pos.merchant_name = merchant_name
    pos.merchant_site = merchant_site
    pos.merchant_slug = merchant_slug

    return this.client.create({resource: pos})
  }
}
