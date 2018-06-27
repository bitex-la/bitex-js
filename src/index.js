import axios from 'axios'
import _ from 'lodash'
import JsonapiClient from 'heather-js'
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
  Order,
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
    this.client.define(Purchase)
    this.client.define(PurchaseIntention)
    this.client.define(Reception)
    this.client.define(Sale)
    this.client.define(Ticker)
    this.client.define(Transaction)
    this.client.define(User)
    this.client.define(UserCoinAddressBookEntry)
    this.client.define(WithdrawalInstruction)
  }

  async getMarket(code){
    return this.client.find({type: 'markets', id: code})
  }

  async getTicker(code){
    return this.client.find({type: 'markets', id: code, customParams: {scope: 'ticker'}})
  }

  async getTransactions(code){
    return this.client.findAll({type: Transaction, orderbook_code: code}).then(
      (market) => {
        return market.transactions
      }
    )
  }

  async getCandles(code){
    return this.client.findAll({type: Candle, orderbook_code: code}).then(
      (market) => market.candles
    )
  }

  async createAsk(orderbook_code, price, amount){
    let ask = new Ask()
    ask.price = price
    ask.amount = amount

    return this.client.create({resource: ask, orderbook_code})
  }

  async cancelAsk(ids){
    const asks = ids.map((id) => {
      let ask = new Ask()
      ask.id = id
      return ask
    })

    //This parameter is ignored by the controller. In case this changes, we should
    //add the orderbook code as a parameter to this method.
    const orderbook_code = 'btc_usd'

    return this.client.customAction({type: Ask, action: 'cancel', resource: asks, orderbook_code})
  }

  async createBid(orderbook_code, price, amount){
    let bid = new Bid()
    bid.price = price
    bid.amount = amount

    return this.client.create({resource: bid, orderbook_code})
  }

  async cancelBid(ids){
    const bids = ids.map((id) => {
      let bid = new Bid()
      bid.id = id
      return bid
    })

    //This parameter is ignored by the controller. In case this changes, we should
    //add the orderbook code as a parameter to this method.
    const orderbook_code = 'btc_usd'

    return this.client.customAction({type: Bid, action: 'cancel', resource: bids, orderbook_code})
  }

  async getOrders(){
    return this.client.findAll({type: 'orders'})
  }

  async cancelOrders(orderbook_code){
    let order = new Order()
    order.id = orderbook_code || 'all'
    return this.client.customAction({resource: order, action: 'cancel'})
  }

  async getOrderbooks(){
    return this.client.findAll({type: 'orderbooks'})
  }

  async createCashDeposit(currency, amount, method){
    let cashDeposit = new CashDeposit()
    cashDeposit.requested_amount = amount
    cashDeposit.requested_currency = currency
    cashDeposit.deposit_method = method

    return this.client.create({resource: cashDeposit})
  }

  async getAssetWallets(){
    return this.client.findAll({type: 'asset_wallets', customParams: {scope: 'exchange'}})
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
    return this.client.findAll({type: 'withdrawal_instructions'})
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
}
