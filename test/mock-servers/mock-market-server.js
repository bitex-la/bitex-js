import nock from 'nock'

let mockServer = () => {
  let marketDetail = nock('https://test.bitex.la')
    .get('/api/markets/btc_usd/')
    .reply(200, {
      "data": {
        "id": "btc_usd",
        "type": "markets",
        "relationships": {
          "candles": {
            "data": [
              {
                "id": "1528396871",
                "type": "candles"
              }
            ]
          },
          "transactions": {
            "data": []
          },
          "bids": {
            "data": [
              {
                "id": "10.0",
                "type": "order_groups"
              }
            ]
          },
          "asks": {
            "data": []
          }
        }
      },
      "included": [
        {
          "id": "1528396871",
          "type": "candles",
          "attributes": {
            "timestamp": 1528396871,
            "low": 0,
            "open": 0,
            "close": 0,
            "high": 0,
            "volume": 0,
            "price_before_last": 0,
            "vwap": 0
          }
        },
        {
          "id": "10.0",
          "type": "order_groups",
          "attributes": {
            "price": 10,
            "amount": 10
          }
        }
      ]
    })

  let marketTicker = nock('https://test.bitex.la')
    .get('/api/markets/btc_usd/?scope=ticker')
    .reply(200, {
      "data": {
        "id": "btc_usd",
        "type": "tickers",
        "attributes": {
          "last": 200,
          "open": 100,
          "high": 300,
          "low": 50,
          "vwap": null,
          "volume": 0,
          "bid": 10,
          "ask": 0,
          "price_before_last": 0
        }
      }
    })

    let marketTransactions = nock('https://test.bitex.la')
    .get('/api/markets/bch_usd/transactions/')
    .reply(200, {
      "data": {
        "id": "bch_usd",
        "type": "markets",
        "relationships": {
          "candles": {
            "data": null
          },
          "transactions": {
            "data": [
              {
                "id": "27",
                "type": "transactions"
              }
            ]
          },
          "bids": {
            "data": null
          },
          "asks": {
            "data": null
          }
        }
      },
      "included": [
        {
          "id": "27",
          "type": "transactions",
          "attributes": {
            "timestamp": 1528479620,
            "price": 1222,
            "amount": 1
          }
        }
      ]
    })
}
export default mockServer
