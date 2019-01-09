import { expect } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import { ApiKey } from '../src/models'

describe('Api Keys', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/api_keys/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('get api keys', async () => {
    const apiKeys = await client.getApiKeys()
    apiKeys.every(apikey => expect(apikey).to.be.an.instanceof(ApiKey))
  })

  it('get api key', async () => {
    const apiKey = await client.getApiKey(3)
    expect(apiKey).to.be.an.instanceof(ApiKey)
  })

  it('create api key', async () => {
    const apiKey = await client.createApiKey(true, 'otp')
    expect(apiKey).to.be.an.instanceof(ApiKey)
    expect(apiKey.id).to.not.be.empty
    expect(apiKey.write).to.be.true
  })

  it('revoke api key', async () => {
    const response = await client.deleteApiKey(3)
    expect(response).to.be.empty
  })
})
