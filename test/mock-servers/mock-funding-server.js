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

}
export default mockServer
