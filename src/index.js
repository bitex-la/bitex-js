import JsonapiClient from 'heather-js'
import * as models from './models'
const {
  Account,
  Ask,
  Bid,
  Buy,
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
  Sell,
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
  /**
   * Create Bitex client.
   * @param {object} config
   * @param {string} config.apiKey
   * @param {string} [config.environment] - Use 'sandbox' for testing against
   * https://sandbox.bitex.la and 'test' for testing locally.
   */
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

  /**
   * @private
   * Define Bitex models
   */
  defineModels(){
    for(let key in models){
      const model = models[key]
      this.client.define(model)
    }
  }

  /**
   * Get Market information.
   * @param {string} orderbook_code
   */
  async getMarket(orderbook_code){
    return this.client.find({type: Market, id: orderbook_code})
  }

  /**
   * Get tickers of all available orderbooks
   */
  async getTickers(){
    return this.client.findAll({type: Ticker})
  }

  /**
   * Get ticker of a specific orderbook
   * @param {string} orderbook_code 
   */
  async getTicker(orderbook_code){
    return this.client.find({type: Ticker, id: orderbook_code})
  }

  /**
   * Get transactions of a specific orderbook
   * @param {string} [orderbook_code]
   * @param {number} [hours] - Number of hours ago to get the transactions from.
   */
  async getTransactions(orderbook_code, hours){
    let query = {type: Transaction, filter: {}}
    if(orderbook_code) Object.assign(query.filter, { orderbook_code })
    if(hours) Object.assign(query.filter, { from: hours })
    return this.client.findAll(query)
  }

  /**
   * Get a specific transaction.
   * @param {number} id 
   */
  async getTransaction(id){
    return this.client.findAll({type: Transaction, id})
  }

  /**
   * Get candles for a specific orderbook
   * @param {string} [orderbook_code]
   * @param {number} [days] - Number of days ago to start the candles from.
   * @param {number} [span] - Amount of hours for each candle. 
   */
  async getCandles(orderbook_code, days, span){
    let query = {type: Candle, filter: {}}
    if(orderbook_code) Object.assign(query.filter, { orderbook_code })
    if(days) Object.assign(query.filter, { days })
    if(span) query.customParams = { span }
    return this.client.findAll(query)
  }

  /**
   * Create an Ask.
   * An Ask is a Sell order to be executed in the orderbook.
   * @param {string} orderbook_code
   * @param {number} price
   * @param {number} amount
   */
  async createAsk(orderbook_code, price, amount){
    let ask = new Ask()
    Object.assign(ask, {orderbook_code, price, amount})

    return this.client.create({resource: ask})
  }

  /**
   * Get all own Asks.
   * @param {string} [orderbook_code]
   */
  async getAsks(orderbook_code){
    let query = {type: Ask}
    if (orderbook_code) {
      Object.assign(query, {filter: { orderbook_code }})
    }
    return this.client.findAll(query)
  }

  /**
   * Get a specific Ask.
   * @param {number} id 
   */
  async getAsk(id){
    return this.client.find({type: Ask, id})
  }

  /**
   * Cancel an Ask.
   * @param {number} id 
   */
  async cancelAsk(id){
    let ask = new Ask()
    ask.id = id

    return this.client.customAction({action: 'cancel', resource: ask})
  }

  /**
   * Create a Bid.
   * An Bid is a Buy order to be executed in the orderbook.
   * @param {string} orderbook_code
   * @param {number} price
   * @param {number} amount
   */
  async createBid(orderbook_code, price, amount){
    let bid = new Bid()
    Object.assign(bid, {orderbook_code, price, amount})

    return this.client.create({resource: bid})
  }

  /**
   * Get all own Bids.
   * @param {string} [orderbook_code]
   */
  async getBids(orderbook_code){
    let query = {type: Bid}
    if (orderbook_code) {
      Object.assign(query, {filter: {orderbook_code}})
    }
    return this.client.findAll(query)
  }

  /**
   * Get a specific Bid.
   * @param {number} id 
   */
  async getBid(id){
    return this.client.find({type: Bid, id})
  }

  /**
   * Cancel a Bid.
   * @param {number} id 
   */
  async cancelBid(id){
    let bid = new Bid()
    bid.id = id

    return this.client.customAction({action: 'cancel', resource: bid})
  }

  /**
   * Get own Orders.
   * Orders are both Bids and Asks.
   * @param {number} id 
   */
  async getOrders(){
    return this.client.findAll({type: Order})
  }

  /**
   * Cancel all Orders.
   * @param {string} [orderbook_code] - If no orderbook code is provided, this
   * will cancel all orders in all orderbooks.
   * Take into account that some or all the Orders could have been matched just
   * before this request, and therefore the cancel had no effect. It is
   * recommended to check the status of the Bids and Asks to obtain the final
   * execution status.
   */
  async cancelOrders(orderbook_code){
    let actionParams = {action: 'cancel', type: Order}
    if (orderbook_code) {
      Object.assign(actionParams, {filter: { orderbook_code }})
    }
    return this.client.customAction(actionParams)
  }

  /**
   * Get own trades (Buys & Sells).
   * @param {string} [orderbook_code]
   * @param {number} [days] - Number of days ago to get the trades from.
   * @param {number} [limit] - Max quantity of trades to retrieve.
   */
  async getTrades(orderbook_code, days, limit){
    let query = {type: 'trades', filter: {}}
    if(orderbook_code) Object.assign(query.filter, { orderbook_code })
    if(days) Object.assign(query.filter, { days })
    if(limit) query.customParams = { limit }
    return this.client.findAll(query)
  }

  /**
   * Get own buys.
   * @param {string} [orderbook_code]
   * @param {number} [days] - Number of days ago to get the trades from.
   * @param {number} [limit] - Max quantity of trades to retrieve.
   */
  async getBuys(orderbook_code, days, limit){
    let query = {type: Buy, filter: {}}
    if(orderbook_code) Object.assign(query.filter, { orderbook_code })
    if(days) Object.assign(query.filter, { days })
    if(limit) query.customParams = { limit }
    return this.client.findAll(query)
  }

  /**
   * Get own sells.
   * @param {string} [orderbook_code]
   * @param {number} [days] - Number of days ago to get the trades from.
   * @param {number} [limit] - Max quantity of trades to retrieve.
   */
  async getSells(orderbook_code, days, limit){
    let query = {type: Sell, filter: {}}
    if(orderbook_code) Object.assign(query.filter, { orderbook_code })
    if(days) Object.assign(query.filter, { days })
    if(limit) query.customParams = { limit }
    return this.client.findAll(query)
  }

  /**
   * Get all Orderbooks.
   */
  async getOrderbooks(){
    return this.client.findAll({type: Orderbook})
  }

  /**
   * Get last movements.
   */
  async getMovements(){
    return this.client.findAll({type: Movement})
  }

  /**
   * Get account information and balances.
   */
  async getAccount(){
    return this.client.findAll({type: Account}).then((accounts) => accounts[0])
  }

  /**
   * Get Cash Wallets and balances.
   */
  async getCashWallets(){
    return this.client.findAll({type: CashWallet})
  }

  /**
   * Get Coin Wallets (with its addresses) and balances
   */
  async getCoinWallets(){
    return this.client.findAll({type: CoinWallet})
  }

  /**
   * Create Cash Wiwthdrawal.
   * @param {string} fiat_code - Possible values: 'USD', 'ARS', 'CLP', 'PYG' and
   * 'UYU'.
   * @param {number} amount
   * @param {WithdrawalInstruction} withdrawal_instruction
   * @param {number} otp - One time password obtained from the 2FA (Google
   * Authenticator)
   */
  async createCashWithdrawal(fiat_code, amount, withdrawal_instruction, otp){
    let cashWithdrawal = new CashWithdrawal()
    Object.assign(cashWithdrawal, { fiat_code, amount, withdrawal_instruction })

    this.client.setHeader('One-Time-Password', otp)
    return this.client.create({resource: cashWithdrawal})
  }

  /**
   * Create Withdrawal Instruction
   * @param {string} label
   * @param {object} body - See updated documentation of valid body structures
   * on https://developers.bitex.la/#29243a11-90f1-4b15-9cc8-eec12b550c0b
   */
  async createWithdrawalInstructions(label, body){
    let withdrawalInstruction = new WithdrawalInstruction()
    Object.assign(withdrawalInstruction, { label, body })

    return this.client.create({resource: withdrawalInstruction})
  }

  /**
   * Get all Withdrawal Instructions.
   */
  async getWithdrawalInstructions(){
    return this.client.findAll({type: WithdrawalInstruction})
  }

  /**
   * Delete Withdrawal Instruction.
   * @param {number} id 
   */
  async deleteWithdrawalInstructions(id){
    let withdrawalInstruction = new WithdrawalInstruction()
    withdrawalInstruction.id = id
    return this.client.delete({resource: withdrawalInstruction})
  }

  /**
   * Create Coin Withdrawal
   * @param {string} coin_code - Possible values: 'BTC' and 'BCH'
   * @param {number} amount
   * @param {string} label
   * @param {string} to_addresses
   * @param {number} otp - One time password obtained from the 2FA (Google
   * Authenticator)
   */
  async createCoinWithdrawal(coin_code, amount, label, to_addresses, otp){
    let coinWithdrawal = new CoinWithdrawal()
    Object.assign(coinWithdrawal, { coin_code, amount, label, to_addresses })

    this.client.setHeader('One-Time-Password', otp)
    return this.client.create({resource: coinWithdrawal})
  }

  /**
   * Get Buying Bots.
   */
  async getBuyingBots(){
    return this.client.findAll({type: BuyingBot})
  }

  /**
   * Get a specific Buying Bot.
   * @param {number} id 
   */
  async getBuyingBot(id){
    return this.client.find({type: BuyingBot, id})
  }

  /**
   * Create a Buying Bot.
   * A Buying Bot will take an amount and an orderbook and will try to buy the
   * _base_ asset (crypto asset, in general) with the specified amount of the
   * _quote_ asset.
   * The strategy used by the buying bot is to buy in little chunks over time
   * and only if the spread is less than 1%. This prevents the buyer to pay an
   * abnormal high price.
   * @example
   * //Buy 100 USD in BTC
   * createBuyingBot(100, Orderbooks.BTCUSD)
   * @param {number} amount 
   * @param {string} orderbook_code 
   */
  async createBuyingBot(amount, orderbook_code){
    let buyingBot = new BuyingBot()
    Object.assign(buyingBot, {amount, orderbook_code})

    return this.client.create({resource: buyingBot})
  }

  /**
   * Cancel a Buying Bot.
   * The orders executed by the bot will not be cancelled, but it won't create
   * any more.
   * @param {number} buyingBotId 
   */
  async cancelBuyingBot(buyingBotId){
    let buyingBot = new BuyingBot()
    buyingBot.id = buyingBotId
    return this.client.customAction({resource: buyingBot, action: 'cancel'})
  }

  /**
   * Get Selling Bots.
   */
  async getSellingBots(){
    return this.client.findAll({type: SellingBot})
  }

  /**
   * Get a specific Selling Bot.
   * @param {number} id 
   */
  async getSellingBot(id){
    return this.client.find({type: SellingBot, id})
  }

  /**
   * Create a Selling Bot.
   * A Selling Bot will take an amount and an orderbook and will try to sell the
   * specified amount of _base_ asset (crypto asset, in general) in order to get
   * _quote_ asset.
   * The strategy used by the selling bot is to sell in little chunks over time
   * and only if the spread is less than 1%. This prevents the seller to get an
   * abnormal low price.
   * @example
   * //Sell 1 BTC into USD
   * createSellingBot(1, Orderbooks.BTCUSD)
   * @param {number} amount 
   * @param {string} orderbook_code 
   */
  async createSellingBot(amount, orderbook_code){
    let sellingBot = new SellingBot()
    Object.assign(sellingBot, {amount, orderbook_code})

    return this.client.create({resource: sellingBot})
  }

  /**
   * Cancel a Selling Bot.
   * The orders executed by the bot will not be cancelled, but it won't create
   * any more.
   * @param {number} sellingBotId 
   */
  async cancelSellingBot(sellingBotId){
    let sellingBot = new SellingBot()
    sellingBot.id = sellingBotId
    return this.client.customAction({resource: sellingBot, action: 'cancel'})
  }

  /**
   * Get all Payments.
   */
  async getPayments(){
    return this.client.findAll({type: Payment})
  }

  /**
   * Get a specific Payment.
   * @param {number} id 
   */
  async getPayment(id){
    return this.client.find({type: Payment, id})
  }

  /**
   * Create a new Payment.
   * @param {number} amount - Amount in cash to be paid.
   * @param {number} keep - Percentage to keep in BTC. If not specified, it will
   * take the merchant's general 'keep' configuration or 0 otherwise.
   * @param {string} currency_code - Possible values: 'BTC', 'USD', 'ARS',
   * 'CLP', 'PYG' and 'UYU'
   * @param {string} callback_url - URL to be notified when the status of this
   * payment changes.
   * @param {*} customer_reference - Reference to show to the customer.
   * @param {*} merchant_reference - Internal reference for the merchant.
   */
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

  /**
   * Create a Point of Sale.
   * Note: This can be configured manually from the web and is commonly set only
   * once. Use this method if you are providing a service for multiple
   * merchants.
   * @param {number} merchant_keep - Percentage to keep in BTC from each sale.
   * @param {string} merchant_logo - URL of the logo image.
   * @param {string} merchant_name - Name of the merchant.
   * @param {string} merchant_site - @deprecated URL of the Merchant.
   * @param {*} merchant_slug - @deprecated Slug to be used in Bitex POS for the
   * merchant.
   */
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
