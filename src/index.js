import axios from 'axios'
import _ from 'lodash'
import JsonapiClient from 'heather-js'
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
    this.client.define(Bank)
    this.client.define(Bid)
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

  async createBid(orderbook_code, price, amount){
    let bid = new Bid()
    bid.price = price
    bid.amount = amount

    return this.client.create({resource: bid, orderbook_code})
  }
}
