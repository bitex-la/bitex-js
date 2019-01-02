import _ from 'lodash'
import JsonapiClient from 'heather-js'
import * as models from './models'
const {
  Account,
  Ask,
  Bid,
  BuyingBot,
  Candle,
  CashWallet,
  CashWithdrawal,
  CoinWallet,
  CoinWithdrawal,
  Market,
  Movement,
  Order,
  Orderbook,
  Payment,
  POS,
  SellingBot,
  Ticker,
  Transaction,
  WithdrawalInstruction
} = models

export const Orderbooks = {
  BTCUSD: 'btc_usd',
  BTCARS: 'btc_ars',
  BTCCLP: 'btc_clp',
  BTCPYG: 'btc_pyg',
  BTCUYU: 'btc_uyu',
  BCHUSD: 'bch_usd'
}

export default class Bitex {
  constructor({apiKey, environment = 'production'}){
    const prefix = (environment !== 'production') ? environment + '.' : ''
    let url = `https://${prefix}bitex.la/api`
    if(environment === 'test'){
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
      url = 'https://localhost:3000/api'
    }

    this.client = new JsonapiClient(url)
    this.client.setHeader('Authorization', apiKey)

    this.defineModels()
  }

  defineModels(){
    _.forEach(models, (model) => this.client.define(model))
  }

  async getMarket(code){
    return this.client.find({type: Market, id: code})
  }

  async getTickers(){
    return this.client.findAll({type: Ticker})
  }

  async getTicker(code){
    return this.client.find({type: Ticker, id: code})
  }

  async getTransactions(orderbook_code){
    return this.client.findAll({type: Transaction, filter: { orderbook_code }})
  }

  async getTransaction(id){
    return this.client.findAll({type: Transaction, id})
  }

  async getCandles(orderbook_code){
    return this.client.findAll({type: Candle, filter: { orderbook_code }})
  }

  async createAsk(orderbook_code, price, amount){
    let ask = new Ask()
    Object.assign(ask, {price, amount, orderbook_code})

    return this.client.create({resource: ask})
  }

  async cancelAsk(id){
    let ask = new Ask()
    ask.id = id

    return this.client.customAction({action: 'cancel', resource: ask})
  }

  async createBid(orderbook_code, price, amount){
    let bid = new Bid()
    Object.assign(bid, {price, amount, orderbook_code})

    return this.client.create({resource: bid})
  }

  async cancelBid(id){
    let bid = new Bid()
    bid.id = id

    return this.client.customAction({action: 'cancel', resource: bid})
  }

  async getOrders(){
    return this.client.findAll({type: Order})
  }

  async cancelOrders(orderbook_code){
    let actionParams = {action: 'cancel', type: Order}
    if (orderbook_code) {
      Object.assign(actionParams, {filter: {orderbook_code}})
    }
    return this.client.customAction(actionParams)
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

  async getCashWallets(){
    return this.client.findAll({type: CashWallet})
  }

  async getCoinWallets(){
    return this.client.findAll({type: CoinWallet})
  }

  async createCashWithdrawal(fiat_code, amount, withdrawal_instruction, otp){
    let cashWithdrawal = new CashWithdrawal()
    Object.assign(cashWithdrawal, { fiat_code, amount, withdrawal_instruction })

    this.client.setHeader('One-Time-Password', otp)
    return this.client.create({resource: cashWithdrawal})
  }

  async createWithdrawalInstructions(label, body){
    let withdrawalInstruction = new WithdrawalInstruction()
    Object.assign(withdrawalInstruction, { label, body })

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

  async createCoinWithdrawal(coin_code, amount, label, to_addresses, otp){
    let coinWithdrawal = new CoinWithdrawal()
    Object.assign(coinWithdrawal, { coin_code, amount, label, to_addresses })

    this.client.setHeader('One-Time-Password', otp)
    return this.client.create({resource: coinWithdrawal})
  }

  async getBuyingBots(){
    return this.client.findAll({type: BuyingBot})
  }

  async getBuyingBot(id){
    return this.client.find({type: BuyingBot, id})
  }

  async createBuyingBot(amount, orderbook_code){
    let buyingBot = new BuyingBot()
    Object.assign(buyingBot, {amount, orderbook_code})

    return this.client.create({resource: buyingBot})
  }

  async cancelBuyingBot(buyingBotId){
    let buyingBot = new BuyingBot()
    buyingBot.id = buyingBotId
    return this.client.customAction({resource: buyingBot, action: 'cancel'})
  }

  async getSellingBots(){
    return this.client.findAll({type: SellingBot})
  }

  async getSellingBot(id){
    return this.client.find({type: SellingBot, id})
  }

  async createSellingBot(amount, orderbook_code){
    let sellingBot = new SellingBot()
    Object.assign(sellingBot, {amount, orderbook_code})

    return this.client.create({resource: sellingBot})
  }

  async cancelSellingBot(sellingBotId){
    let sellingBot = new SellingBot()
    sellingBot.id = sellingBotId
    return this.client.customAction({resource: sellingBot, action: 'cancel'})
  }

  async getPayments(){
    return this.client.findAll({type: Payment})
  }

  async getPayment(id){
    return this.client.find({type: Payment, id})
  }

  async createPayment(amount, keep, currency_code, callback_url,
    customer_reference, merchant_reference
  ){
    let payment = new Payment()
    Object.assign(payment, {
      amount, keep, currency_code, callback_url, customer_reference, 
      merchant_reference
    })

    return this.client.create({resource: payment})
  }

  async createPOS(
    merchant_keep, merchant_logo, merchant_name, merchant_site, merchant_slug
  ){
    let pos = new POS()
    Object.assign(pos, {
      merchant_keep, merchant_logo, merchant_name, merchant_site, merchant_slug
    })

    return this.client.create({resource: pos})
  }
}
