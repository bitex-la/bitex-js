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

    let marketCandles = nock('https://test.bitex.la')
      .get('/api/markets/btc_usd/candles/')
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
              "data": null
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
            "id": "1528396871",
            "type": "candles",
            "attributes": {
              "timestamp": 1528396871,
              "low": 100,
              "open": 200,
              "close": 300,
              "high": 400,
              "volume": 10,
              "price_before_last": 0,
              "vwap": 0
            }
          }
        ]
      })

    let postAsk = nock('https://test.bitex.la')
      .post('/api/markets/btc_usd/asks/', {
        "data": {
          "type": "asks",
          "attributes": {
            "amount": 1.2,
            "price": 150,
            "remaining_amount": null,
            "orderbook": null,
            "user": null
          }
        }
      })
      .reply(200, {
        "data": {
          "id": "57",
          "type": "asks",
          "attributes": {
            "amount": 1.2,
            "remaining_amount": 1.2,
            "price": 150.0
          },
          "relationships": {
            "user": {
              "data": {
                "id": "8",
                "type": "users"
              }
            },
            "orderbook": {
              "data": {
                "id": "1",
                "type": "orderbooks"
              }
            }
          }
        }
      })

    let cancelAsks = nock('https://test.bitex.la')
      .post('/api/markets/btc_usd/asks/cancel/', [
        {
          "data": {
            "type": "asks",
            "id": "70",
            "attributes": {
              "amount": null,
              "remaining_amount": null,
              "price": null,
              "orderbook": null,
              "user": null
            }
          }
        },
        {
          "data": {
            "type": "asks",
            "id": "71",
            "attributes": {
              "amount": null,
              "remaining_amount": null,
              "price": null,
              "orderbook": null,
              "user": null
            }
          }
        }
      ])
      .reply(207, {
        "data": [{
          "type": "cancel_status",
          "text": "conflict",
          "value": false
        }, {
          "type": "cancel_status",
          "text": "not_found",
          "value": true
        }]
      })

    let postBid = nock('https://test.bitex.la')
      .post('/api/markets/btc_usd/bids/', {
        "data": {
          "type": "bids",
          "attributes": {
            "amount": 100,
            "price": 12,
            "remaining_amount": null,
            "orderbook": null,
            "user": null
          }
        }
      })
      .reply(200, {
        "data": {
          "id": "70",
          "type": "bids",
          "attributes": {
            "amount": 100,
            "remaining_amount": 100,
            "price": 12.0
          },
          "relationships": {
            "user": {
              "data": {
                "id": "8",
                "type": "users"
              }
            },
            "orderbook": {
              "data": {
                "id": "1",
                "type": "orderbooks"
              }
            }
          }
        }
      })

    let cancelBids = nock('https://test.bitex.la')
      .post('/api/markets/btc_usd/bids/cancel/', [
        {
          "data": {
            "type": "bids",
            "id": "70",
            "attributes": {
              "amount": null,
              "remaining_amount": null,
              "price": null,
              "orderbook": null,
              "user": null
            }
          }
        },
        {
          "data": {
            "type": "bids",
            "id": "71",
            "attributes": {
              "amount": null,
              "remaining_amount": null,
              "price": null,
              "orderbook": null,
              "user": null
            }
          }
        }
      ])
      .reply(207, {
        "data": [{
          "type": "cancel_status",
          "text": "conflict",
          "value": false
        }, {
          "type": "cancel_status",
          "text": "not_found",
          "value": true
        }]
      })
}
export default mockServer
