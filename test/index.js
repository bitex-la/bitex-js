import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const sandbox = chai.spy.sandbox()

import { mockMarketServer } from './mock-servers'

import Bitex from '../src'

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
      expect(market).to.have.property('bids')
      expect(market.bids.length).to.equal(1)
      expect(market).to.have.property('asks')
      expect(market.asks.length).to.equal(0)
      expect(market).to.have.property('transactions')
      expect(market).to.have.property('candles')
    })
  })
})
