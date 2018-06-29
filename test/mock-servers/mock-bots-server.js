import nock from 'nock'

let mockServer = () => {
  let getAllBuyingBots = nock('https://test.bitex.la')
    .get('/api/buying_bots/')
    .reply(200, {
      "data": [
        {
          "id": "1",
          "type": "buying_bots",
          "attributes": {
            "amount": 100,
            "remaining_amount": 100,
            "chunk_size": 5,
            "eta": "2018-06-12T20:04:08.136Z",
            "executing": true,
            "to_cancel": true
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
      ]
    })

  let getOneBuyingBots = nock('https://test.bitex.la')
    .get('/api/buying_bots/1/')
    .reply(200, {
      "data": {
        "id": "1",
        "type": "buying_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": 100,
          "chunk_size": 5,
          "eta": "2018-06-12T20:04:08.136Z",
          "executing": true,
          "to_cancel": true
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

  let createBuyingBot = nock('https://test.bitex.la')
    .post('/api/buying_bots/', {
      "data": {
        "type": "buying_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": null,
          "chunk_size": null,
          "eta": null,
          "executing": null,
          "to_cancel": null,
          "user": null
        },
        "relationships": {
          "orderbook": {
            "data": {
              "id": "1",
              "type": "orderbooks",
              "attributes": {
                "code": null,
                "base": null,
                "quote": null
              }
            }
          }
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "1",
        "type": "buying_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": 100,
          "chunk_size": 5,
          "eta": "2018-06-12T19:53:38.935Z",
          "executing": true,
          "to_cancel": false
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

  let cancelBuyingBot = nock('https://test.bitex.la')
    .post('/api/buying_bots/1/cancel/')
    .reply(200, {
      "data": {
        "id": "1",
        "type": "buying_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": 100,
          "chunk_size": 5,
          "eta": "2018-06-12T19:53:38.935Z",
          "executing": true,
          "to_cancel": true
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

  let getAllSellingBots = nock('https://test.bitex.la')
    .get('/api/selling_bots/')
    .reply(200, {
      "data": [
        {
          "id": "1",
          "type": "selling_bots",
          "attributes": {
            "amount": 100,
            "remaining_amount": 100,
            "chunk_size": 5,
            "eta": "2018-06-12T20:04:08.136Z",
            "executing": true,
            "to_cancel": true
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
      ]
    })

  let getOneSellingBots = nock('https://test.bitex.la')
    .get('/api/selling_bots/1/')
    .reply(200, {
      "data": {
        "id": "1",
        "type": "selling_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": 100,
          "chunk_size": 5,
          "eta": "2018-06-12T20:04:08.136Z",
          "executing": true,
          "to_cancel": true
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

  let createSellingBot = nock('https://test.bitex.la')
    .post('/api/selling_bots/', {
      "data": {
        "type": "selling_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": null,
          "chunk_size": null,
          "eta": null,
          "executing": null,
          "to_cancel": null,
          "user": null
        },
        "relationships": {
          "orderbook": {
            "data": {
              "id": "1",
              "type": "orderbooks",
              "attributes": {
                "code": null,
                "base": null,
                "quote": null
              }
            }
          }
        }
      }
    })
    .reply(200, {
      "data": {
        "id": "1",
        "type": "selling_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": 100,
          "chunk_size": 5,
          "eta": "2018-06-12T19:53:38.935Z",
          "executing": true,
          "to_cancel": false
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

  let cancelSellingBot = nock('https://test.bitex.la')
    .post('/api/selling_bots/1/cancel/')
    .reply(200, {
      "data": {
        "id": "1",
        "type": "selling_bots",
        "attributes": {
          "amount": 100,
          "remaining_amount": 100,
          "chunk_size": 5,
          "eta": "2018-06-12T19:53:38.935Z",
          "executing": true,
          "to_cancel": true
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

}
export default mockServer
