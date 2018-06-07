import axios from 'axios'
import _ from 'lodash'
import JsonapiClient from 'heather-js'
import {
  Market
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
  }

  async getMarket(code){
    return this.client.find({type: 'markets', id: code})
  }
}
