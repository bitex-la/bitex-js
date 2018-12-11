import chai, { expect, assert } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  Payment,
  BitcoinAddress,
  POS
} from '../src/models'

describe('Merchant', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/merchant/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('get payments', async () => {
    const payments = await client.getPayments()
    payments.every(p => {
      expect(p).to.be.an.instanceof(Payment) &&
      expect(p.address).to.be.an.instanceof(BitcoinAddress)
    })
  })

  it('get payment', async () => {
    const payment = await client.getPayment(1)
    expect(payment).to.be.an.instanceof(Payment)
    expect(payment.address).to.be.an.instanceof(BitcoinAddress)
  })

  it('create payment', async () => {
    const payment = await client.createPayment(
      200,
      10,
      '1',
      'https://mystore.com/webhook',
      'Purchase at My Store',
      'Sale id: 2212'
    )
    expect(payment).to.be.an.instanceof(Payment)
    expect(payment.id).to.not.be.empty
    expect(payment.address).to.be.an.instanceof(BitcoinAddress)
  })

  it('create POS', async () => {
    const pos = await client.createPOS(10, 'https://mystore.com/logo.png', 'My Store', 'https://mystore.com', 'my-store')
    expect(pos).to.be.an.instanceof(POS)
    expect(pos.id).to.not.be.empty
  })
})
