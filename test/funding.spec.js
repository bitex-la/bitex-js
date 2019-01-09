import { expect } from 'chai'

import _ from 'lodash'

import VCR from 'axios-vcr'

import Bitex from '../src'
import {
  CashWallet,
  CashWithdrawal,
  CoinWallet,
  CoinWithdrawal,
  WithdrawalInstruction,
  CashDeposit,
  CoinDeposit
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

  it('get coin wallet', async () => {
    const coinWallet = await client.getCoinWallet(65)
    expect(coinWallet).to.be.an.instanceof(CoinWallet)
  })

  it('get cash wallets', async () => {
    const cashWallets = await client.getCashWallets()
    cashWallets.every(cw => expect(cw).to.be.an.instanceof(CashWallet))
  })

  it('get cash wallet usd', async () => {
    const cashWallet = await client.getCashWallet('USD')
    expect(cashWallet).to.be.an.instanceof(CashWallet)
  })

  it('get cash deposits', async () => {
    const cashDeposits = await client.getCashDeposits()
    cashDeposits.every(cw => expect(cw).to.be.an.instanceof(CashDeposit))
  })

  it('get cash deposit', async () => {
    const cashDeposit = await client.getCashDeposit(1)
    expect(cashDeposit).to.be.an.instanceof(CashDeposit)
  })

  it('get coin deposits', async () => {
    const coinDeposits = await client.getCoinDeposits()
    coinDeposits.every(cw => expect(cw).to.be.an.instanceof(CoinDeposit))
  })

  it('get coin deposit', async () => {
    const coinDeposit = await client.getCoinDeposit(2)
    expect(coinDeposit).to.be.an.instanceof(CoinDeposit)
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

  it('get cash withdrawals', async () => {
    const cashWithdrawals = await client.getCashWithdrawals()
    cashWithdrawals.every(cw => {
      return expect(cw).to.be.an.instanceof(CashWithdrawal)
    })
  })

  it('get cash withdrawal', async () => {
    const cashWithdrawal = await client.getCashWithdrawal(1)
    expect(cashWithdrawal).to.be.an.instanceof(CashWithdrawal)
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

  it('get withdrawal instruction', async () => {
    const withdrawalInstruction = await client.getWithdrawalInstruction(1)
    expect(withdrawalInstruction).to.be.an.instanceof(WithdrawalInstruction)
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

  it('get coin withdrawals', async () => {
    const coinWithdrawals = await client.getCoinWithdrawals()
    coinWithdrawals.every(cw => {
      return expect(cw).to.be.an.instanceof(CoinWithdrawal)
    })
  })

  it('get coin withdrawal', async () => {
    const coinWithdrawal = await client.getCoinWithdrawal(1)
    expect(coinWithdrawal).to.be.an.instanceof(CoinWithdrawal)
  })
})
