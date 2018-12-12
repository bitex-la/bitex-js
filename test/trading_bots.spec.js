import { expect } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  BuyingBot,
  SellingBot
} from '../src/models'

describe('Trading Bots', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/trading_bots/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('get buying bots', async () => {
    const buyingBots = await client.getBuyingBots()
    buyingBots.every(bb => expect(bb).to.be.an.instanceof(BuyingBot))
  })

  it('get buying bot', async () => {
    const buyingBot = await client.getBuyingBot(1)
    expect(buyingBot).to.be.an.instanceof(BuyingBot)
  })

  it('create buying bot', async () => {
    const buyingBot = await client.createBuyingBot(100, 'btc_usd')
    expect(buyingBot).to.be.an.instanceof(BuyingBot)
    expect(buyingBot.id).to.not.be.empty
  })

  it('cancel buying bot', async () => {
    const response = await client.cancelBuyingBot(1)
    expect(response).to.be.empty
  })

  it('get selling bots', async () => {
    const sellingBots = await client.getSellingBots()
    sellingBots.every(sb => expect(sb).to.be.an.instanceof(SellingBot))
  })

  it('get selling bot', async () => {
    const sellingBot = await client.getSellingBot(1)
    expect(sellingBot).to.be.an.instanceof(SellingBot)
  })

  it('create selling bot', async () => {
    const sellingBot = await client.createSellingBot(1, 'btc_usd')
    expect(sellingBot).to.be.an.instanceof(SellingBot)
    expect(sellingBot.id).to.not.be.empty
  })

  it('cancel selling bot', async () => {
    const response = await client.cancelSellingBot(1)
    expect(response).to.be.empty
  })
})
