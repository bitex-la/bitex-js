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

    let getOrders = nock('https://test.bitex.la')
      .get('/api/orders/')
      .reply(200, {
        "data": [
          {
            "id": "71",
            "type": "bids",
            "attributes": {
              "amount": 12800,
              "remaining_amount": 12800,
              "price": 12800
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
          },
          {
            "id": "72",
            "type": "bids",
            "attributes": {
              "amount": 1500,
              "remaining_amount": 1500,
              "price": 2000
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
                  "id": "8",
                  "type": "orderbooks"
                }
              }
            }
          },
          {
            "id": "58",
            "type": "asks",
            "attributes": {
              "amount": 0.75,
              "remaining_amount": 0.75,
              "price": 13500
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
        ],
        "included": [
          {
            "id": "1",
            "type": "orderbooks",
            "attributes": {
              "code": "btc_usd",
              "base": {
                "code": "btc",
                "decimals": 8
              },
              "quote": {
                "code": "usd",
                "decimals": 2
              }
            }
          },
          {
            "id": "8",
            "type": "orderbooks",
            "attributes": {
              "code": "bch_usd",
              "base": {
                "code": "bch",
                "decimals": 8
              },
              "quote": {
                "code": "usd",
                "decimals": 2
              }
            }
          }
        ]
      })

    let cancelAllOrders = nock('https://test.bitex.la')
      .post('/api/orders/all/cancel/')
      .reply(204)

    let cancelOrdersByOrderbook = nock('https://test.bitex.la')
      .post('/api/orders/btc_usd/cancel/')
      .reply(204)

    let getOrderbooks = nock('https://test.bitex.la')
      .get('/api/orderbooks/')
      .reply(200, {
        "data": [
          {
            "id": "1",
            "type": "orderbooks",
            "attributes": {
              "code": "btc_usd",
              "base": {
                "code": "btc",
                "decimals": 8
              },
              "quote": {
                "code": "usd",
                "decimals": 2
              }
            }
          },
          {
            "id": "5",
            "type": "orderbooks",
            "attributes": {
              "code": "btc_ars",
              "base": {
                "code": "btc",
                "decimals": 8
              },
              "quote": {
                "code": "ars",
                "decimals": 2
              }
            }
          },
          {
            "id": "8",
            "type": "orderbooks",
            "attributes": {
              "code": "bch_usd",
              "base": {
                "code": "bch",
                "decimals": 8
              },
              "quote": {
                "code": "usd",
                "decimals": 2
              }
            }
          }
        ]
      })
}
export default mockServer
