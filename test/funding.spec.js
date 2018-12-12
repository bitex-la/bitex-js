import { expect } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  CashWallet,
  CashWithdrawal,
  CoinWallet,
  CoinWithdrawal,
  WithdrawalInstruction
} from '../src/models'

describe('Funding', () => {
  let client
  let getFileName = (testTitle) => {
    return `./fixtures/funding/${_.snakeCase(testTitle)}.json`
  }

  beforeEach(function(){
    client = new Bitex({apiKey: 'valid_api_key', environment: 'test'})
    VCR.mountCassette(getFileName(this.currentTest.title))
  })

  afterEach(function(){
    VCR.ejectCassette(getFileName(this.currentTest.title))
  })

  it('get coin wallets', async () => {
    const coinWallets = await client.getCoinWallets()
    coinWallets.every(cw => expect(cw).to.be.an.instanceof(CoinWallet))
  })

  it('get cash wallets', async () => {
    const cashWallets = await client.getCashWallets()
    cashWallets.every(cw => expect(cw).to.be.an.instanceof(CashWallet))
  })

  it('create cash withdrawal', async () => {
    let instructions = new WithdrawalInstruction()
    instructions.id = 2

    const newCashWithdrawal = await client.createCashWithdrawal(
      'ars', 100, instructions, 'otp'
    )
    expect(newCashWithdrawal).to.be.an.instanceof(CashWithdrawal)
    expect(newCashWithdrawal.id).to.not.be.empty
  })

  it('create withdrawal instructions', async () => {
    const label = 'Local Bank'
    const body = {
      name: 'John Doe',
      city: 'Buenos Aires',
      phone: '12341234',
      cuit: '12341234',
      address: 'My Address 123',
      bank: 'hsbc',
      bank_account_number: '12341234',
      cbu: '1234123412341234',
      account_type: 'savings',
      currency: 'ARS',
      country: 'AR',
      payment_method: 'domestic_bank'
    }

    const newWithdrawalInstruction = await client.createWithdrawalInstructions(
      label, body
    )
    expect(newWithdrawalInstruction).to.be.an.instanceof(WithdrawalInstruction)
    expect(newWithdrawalInstruction.id).to.not.be.empty
  })

  it('get withdrawal instructions', async () => {
    const withdrawalInstructions = await client.getWithdrawalInstructions()
    withdrawalInstructions.every(wi => {
      return expect(wi).to.be.an.instanceof(WithdrawalInstruction)
    })
  })

  it('delete withdrawal instruction', async () => {
    expect(async function(){
      const result = await client.deleteWithdrawalInstructions(4)
      expect(result).to.be.empty
    }).to.not.throw()
  })

  it('create coin withdrawal', async () => {
    const newCoinWithdrawal = await client.createCoinWithdrawal(
      'btc', 12.3456789, 'Trezor', 'mszEUK9E6E7n4SNcrjYH8Fr7ZTGP9n3dRb', 'otp'
    )
    expect(newCoinWithdrawal).to.be.an.instanceof(CoinWithdrawal)
    expect(newCoinWithdrawal.id).to.not.be.empty
  })
})
