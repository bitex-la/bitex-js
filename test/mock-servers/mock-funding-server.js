import nock from 'nock'

let mockServer = () => {
  let newCashDeposit = nock('https://test.bitex.la')
    .post('/api/cash_deposits/', {
      "data": {
        "type": "cash_deposits",
        "attributes": {
          "requested_amount": 1000,
          "requested_currency": "ARS",
          "deposit_method": "debin",
          "receipt_file_name": null,
          "receipt_base64": null,
          "request_details": null
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "80",
        "type": "cash_deposits",
        "attributes": {
          "status": "pending",
          "requested_amount": 1000,
          "requested_currency": "ARS",
          "deposit_method": "debin",
          "country": "AR",
          "clearing_data": null,
          "amount": null,
          "fiat": {
              "attributes": {
                  "id": 4,
                  "code": "ars",
                  "name": "argentine_peso",
                  "decimals": 2
              },
              "id": 4,
              "code": "ars",
              "name": "argentine_peso",
              "decimals": 2
          }
        }
      }
    })

  let getAssetWallets = nock('https://test.bitex.la')
    .get('/api/asset_wallets/?scope=exchange')
    .reply(200, {
      "data": [
        {
          "id": "85",
          "type": "asset_wallets",
          "attributes": {
            "balance": 308.84335732,
            "available": 202.50335732,
            "currency": "btc",
            "address": "mszEUK9E6E7n4SNcrjYH8Fr7ZTGP9n3dRb",
            "auto_sell_address": "mn9cGjEbdNDqyVouAMRjKqRff4ZrLgPMPf"
          },
          "relationships": {
            "app": {
              "data": {
                "id": "8",
                "type": "exchange_apps"
              }
            }
          }
        },
        {
          "id": "90",
          "type": "asset_wallets",
          "attributes": {
            "balance": 321,
            "available": 317.77,
            "currency": "bch",
            "address": "bchtest:qrwxjjl8rh4c6rwfu6ks46j2kufng7ufxveyuttzr0",
            "auto_sell_address": "bchtest:qq6htsjummjscmdfp09cwn5qchvyu6qqfc8e9mr9ed"
          },
          "relationships": {
            "app": {
              "data": {
                "id": "8",
                "type": "exchange_apps"
              }
            }
          }
        }
      ],
      "included": [
        {
          "id": "8",
          "type": "exchange_apps"
        }
      ]
    })

  let newCashWithdrawal = nock('https://test.bitex.la')
    .post('/api/cash_withdrawals/', {
      "data": {
        "type": "cash_withdrawals",
        "attributes": {
          "amount": 100,
          "fiat": "ars",
          "label": null,
          "status": null,
          "created_at": null,
          "payment_method": null
        },
        "relationships": {
          "withdrawal_instruction": {
            "data": {
              "type": "withdrawal_instructions",
              "id": 10,
              "attributes": {
                "label": "Local Bank",
                "body": null
              }
            }
          }
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "29",
        "type": "cash_withdrawals",
        "attributes": {
          "status": "received",
          "amount": 100,
          "country": "AR",
          "payment_method": "domestic_bank",
          "currency": "ARS",
          "label": "Local Bank",
          "created_at": "2018-06-06T17:05:19.024Z"
        },
        "relationships": {
          "withdrawal_instruction": {
            "data": {
              "id": "10",
              "type": "withdrawal_instructions"
            }
          }
        }
      },
      "included": [
        {
          "id": "10",
          "type": "withdrawal_instructions",
          "attributes": {
            "label": "Local Bank",
            "schema": "bitex",
            "body": {
              "name": "John Doe",
              "city": "Buenos Aires",
              "phone": "12341234",
              "cuit": "12341234",
              "address": "My Address 123",
              "bank": "hsbc",
              "bank_account_number": "12341234",
              "cbu": "1234123412341234",
              "account_type": "savings",
              "currency": "ARS",
              "country": "AR",
              "payment_method": "domestic_bank"
            }
          }
        }
      ]
    })

  let newWithdrawalInstruction = nock('https://test.bitex.la')
    .post('/api/withdrawal_instructions/', {
      "data": {
        "type": "withdrawal_instructions",
        "attributes": {
          "label": "Local Bank",
          "body": {
            "name": "John Doe",
            "city": "Buenos Aires",
            "phone": "12341234",
            "cuit": "12341234",
            "address": "My Address 123",
            "bank": "hsbc",
            "bank_account_number": "12341234",
            "cbu": "1234123412341234",
            "account_type": "savings",
            "currency": "ARS",
            "country": "AR",
            "payment_method": "domestic_bank"
          }
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "23",
        "type": "withdrawal_instructions",
        "attributes": {
          "label": "Local Bank",
          "schema": "bitex",
          "body": {
            "name": "John Doe",
            "city": "Buenos Aires",
            "phone": "12341234",
            "cuit": "12341234",
            "address": "My Address 123",
            "bank": "hsbc",
            "bank_account_number": "12341234",
            "cbu": "1234123412341234",
            "account_type": "savings",
            "currency": "ARS",
            "country": "AR",
            "payment_method": "domestic_bank"
          }
        }
      }
    })

  let listWithdrawalInstructions = nock('https://test.bitex.la')
    .get('/api/withdrawal_instructions/')
    .reply(200, {
      "data": [
        {
          "id": "21",
          "type": "withdrawal_instructions",
          "attributes": {
            "label": "Other",
            "schema": "bitex",
            "body": {
              "name": "John Doe",
              "city": "Buenos Aires",
              "phone": "12341234",
              "country": "AR",
              "payment_method": "third_party",
              "currency": "USD"
            }
          }
        },
        {
          "id": "22",
          "type": "withdrawal_instructions",
          "attributes": {
            "label": "Local Bank",
            "schema": "bitex",
            "body": {
              "name": "John Doe",
              "city": "Buenos Aires",
              "phone": "12341234",
              "cuit": "12341234",
              "address": "My Address 123",
              "bank": "hsbc",
              "bank_account_number": "12341234",
              "cbu": "1234123412341234",
              "account_type": "savings",
              "currency": "ARS",
              "country": "AR",
              "payment_method": "domestic_bank"
            }
          }
        }
      ]
    })

  let deleteWithdrawalInstructions = nock('https://test.bitex.la')
    .delete('/api/withdrawal_instructions/12/')
    .reply(200)

  let newCoinWithdrawal = nock('https://test.bitex.la')
    .post('/api/coin_withdrawals/', {
      "data": {
        "type": "coin_withdrawals",
        "attributes": {
          "amount": 12.3456789,
          "currency": "btc",
          "label": "Trezor",
          "to_addresses": "mszEUK9E6E7n4SNcrjYH8Fr7ZTGP9n3dRb"
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "41",
        "type": "coin_withdrawals",
        "attributes": {
          "amount": 12.3456789,
          "status": "received",
          "label": "Trezor",
          "to_addresses": "mszEUK9E6E7n4SNcrjYH8Fr7ZTGP9n3dRb"
        },
        "relationships": {
          "user": {
            "data": {
              "id": "8",
              "type": "users"
            }
          },
          "coin": {
            "data": {
              "attributes": {
                "id": 1,
                "code": "btc",
                "name": "bitcoin",
                "decimals": 8
              },
              "id": 1,
              "code": "btc",
              "name": "bitcoin",
              "decimals": 8
            }
          }
        }
      }
    })
}
export default mockServer
