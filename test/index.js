import chai, { expect } from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const sandbox = chai.spy.sandbox()

import Bitex from '../src'

describe('bitex-js', function(){
  let client

  beforeEach(() => {
    client = new Bitex()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should assert true', () => {
    expect(true).to.equal(true)
  })

})
