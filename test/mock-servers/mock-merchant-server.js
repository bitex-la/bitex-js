import nock from 'nock'

let mockServer = () => {
  let getAllPayments = nock('https://test.bitex.la')
    .get('/api/merchants/payments/')
    .reply(200, {
      "data": [
        {
          "id": "1",
          "type": "payments",
          "attributes": {
            "amount": 15,
            "confirmed_quantity": 0,
            "currency": "btc",
            "customer_reference": "From John",
            "expected_quantity": 15,
            "keep": 50,
            "kept": null,
            "last_quoted_on": "2018-06-13T14:24:59.010Z",
            "merchant_reference": null,
            "overpaid": null,
            "quote_valid_until": "2018-06-13T15:24:59.003Z",
            "settlement_amount": null,
            "settlement_currency": null,
            "status": "pending",
            "unconfirmed_quantity": 0,
            "valid_until": "2018-06-13T15:24:59.003Z"
          },
          "relationships": {
            "address": {
              "data": {
                "id": "141",
                "type": "bitcoin_addresses"
              }
            }
          }
        }
      ],
      "included": [
        {
          "id": "141",
          "type": "bitcoin_addresses",
          "attributes": {
            "auto_sell": false,
            "public_address": "mfYmtH9Pg8jyBmZ4mEajAPApsQXkjdR62q"
          },
          "relationships": {
            "user": {
              "data": {
                "id": "8",
                "type": "users"
              }
            }
          }
        }
      ]
    })

  let getOnePayment = nock('https://test.bitex.la')
    .get('/api/merchants/payments/1/')
    .reply(200, {
      "data": {
        "id": "1",
        "type": "payments",
        "attributes": {
          "amount": 15,
          "confirmed_quantity": 0,
          "currency": "btc",
          "customer_reference": "From John",
          "expected_quantity": 15,
          "keep": 50,
          "kept": null,
          "last_quoted_on": "2018-06-13T14:24:59.010Z",
          "merchant_reference": null,
          "overpaid": null,
          "quote_valid_until": "2018-06-13T15:24:59.003Z",
          "settlement_amount": null,
          "settlement_currency": null,
          "status": "pending",
          "unconfirmed_quantity": 0,
          "valid_until": "2018-06-13T15:24:59.003Z"
        },
        "relationships": {
          "address": {
            "data": {
              "id": "141",
              "type": "bitcoin_addresses"
            }
          }
        }
      },
      "included": [
        {
          "id": "141",
          "type": "bitcoin_addresses",
          "attributes": {
            "auto_sell": false,
            "public_address": "mfYmtH9Pg8jyBmZ4mEajAPApsQXkjdR62q"
          },
          "relationships": {
            "user": {
              "data": {
                "id": "8",
                "type": "users"
              }
            }
          }
        }
      ]
    })

  let createPayment = nock('https://test.bitex.la')
    .post('/api/merchants/payments/', {
      "data": {
        "type": "payments",
        "attributes": {
          "amount": 200,
          "keep": 10,
          "currency": "1",
          "callback_url": "https://mystore.com/webhook",
          "customer_reference": "Purchase at My Store",
          "merchant_reference": "Sale id: 2212",
          "confirmed_quantity": null,
          "expected_quantity": null,
          "kept": null,
          "last_quoted_on": null,
          "overpaid": null,
          "quote_valid_until": null,
          "settlement_amount": null,
          "settlement_currency": null,
          "status": null,
          "unconfirmed_quantity": null,
          "valid_until": null,
          "address": null
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "3",
        "type": "payments",
        "attributes": {
          "amount": 200,
          "confirmed_quantity": 0,
          "currency": "btc",
          "customer_reference": "Purchase at My Store",
          "expected_quantity": 200,
          "keep": 10,
          "kept": null,
          "last_quoted_on": "2018-06-14T18:27:59.166Z",
          "merchant_reference": "Sale id: 2212",
          "overpaid": null,
          "quote_valid_until": "2018-06-14T19:27:59.151Z",
          "settlement_amount": null,
          "settlement_currency": null,
          "status": "pending",
          "unconfirmed_quantity": 0,
          "valid_until": "2018-06-14T19:27:59.151Z"
        },
        "relationships": {
          "address": {
            "data": {
              "id": "143",
              "type": "bitcoin_addresses"
            }
          }
        }
      },
      "included": [
        {
          "id": "143",
          "type": "bitcoin_addresses",
          "attributes": {
            "auto_sell": false,
            "public_address": "mnB4AQSyFgM94Mw3EYJSHFeKsd6Stwor3Z"
          },
          "relationships": {
            "user": {
              "data": {
                "id": "8",
                "type": "users"
              }
            }
          }
        }
      ]
    })

  let createPOS = nock('https://test.bitex.la')
    .post('/api/merchants/pos/', {
      "data": {
        "type": "pos",
        "attributes": {
          "merchant_keep": 10,
          "merchant_logo": "https://mystore.com/logo.png",
          "merchant_name": "My Store",
          "merchant_site": "https://mystore.com",
          "merchant_slug": "my-store"
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "8",
        "type": "pos",
        "attributes": {
          "merchant_slug": "my-store",
          "merchant_keep": 10,
          "merchant_name": "My Store",
          "merchant_logo": "https://mystore.com/logo.png",
          "merchant_site": "https://mystore.com"
        }
      }
    })



}
export default mockServer
