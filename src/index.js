import axios from 'axios'
import _ from 'lodash'
import JsonapiClient from 'heather-js'
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
    this.client.define(Market)
    this.client.define(OrderGroup)
    this.client.define(Ask)
    this.client.define(Bid)
    this.client.define(Orderbook)
    this.client.define(Movement)
    this.client.define(Account)
    this.client.define(User)
    this.client.define(PurchaseIntention)
    this.client.define(Purchase)
    this.client.define(Sale)
    this.client.define(Reception)
    this.client.define(Emission)
    this.client.define(CoinWithdrawal)
    this.client.define(UserCoinAddressBookEntry)
    this.client.define(CashWithdrawal)
    this.client.define(Bank)
    this.client.define(WithdrawalInstruction)
    this.client.define(Notification)
    this.client.define(CashDeposit)
    this.client.define(CashDepositMethod)
    this.client.define(Ticker)
    this.client.define(Candle)
    this.client.define(ContactRequest)
    this.client.define(Country)
  }

  async getMarket(code){
    return this.client.find({type: 'markets', id: code})
  }

  async getTicker(code){
    return this.client.find({type: 'markets', id: code, customParams: {scope: 'ticker'}})
  }
}
