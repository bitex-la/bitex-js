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

}
export default mockServer
