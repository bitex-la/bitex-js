Bitex-js
========

Bitex SDK in Javascript

If you prefer to use a custom client, you can get the API documentation at https://bitex.la/developers

## Usage

For the examples, we are using ES2017 async/await syntax. For previous versions of the standard, you can safely use Promises.

### Initialization

```
let client = new Bitex({apiKey: 'valid_api_key'})
```

To get your Api Key, please sign up in https://bitex.la and go to https://bitex.la/developers

### Market Data

```
const market = await client.getMarket('btc_usd')

//List of Bids
let bids = market.bids

//List of Asks
let asks = market.asks
```

#### Market Ticker

```
const ticker = await client.getTicker('btc_usd')
```

#### Get last Transactions

```
const transactions = await client.getTransactions('btc_usd')
```

### Trading

#### Create Ask

```
/*
 * @param {string} orderbookCode
 * @param {Number} price
 * @param {Number} amount (of BTC to sell)
 */
const newAsk = await client.createAsk('btc_usd', 15000, 1.2)
```

#### Cancel Ask

```
/*
 * @param [string] ids
 */
const cancelledAsks = await client.cancelAsk(['12', '13'])
```

#### Create Bid

```
/*
 * @param {string} orderbookCode
 * @param {Number} price
 * @param {Number} amount (of USD to use)
 */
const newBid = await client.createBid('btc_usd', 15000, 1.2)
```

#### Cancel Bid

```
/*
 * @param [string] ids
 */
const cancelledBid = await client.cancelBid(['101'])
```

#### Get all my Orders

```
const orders = await client.getOrders()
```

#### Cancel all my orders

```
await cancelOrders()
```

### Movements

```
const orders = await client.getMovements()
```

### Account

Within the account are the current balances, movements and pending movements.

```
const account = await client.getAccount()
```

### Deposit/Withdraw

#### Register a Cash Deposit

```
/*
 * @param {string} currency
 * @param {Number} amount
 * @param {string} method (valid values: 'international_bank', 'domestic_bank', 'debin')
 */
const newCashDeposit = await client.createCashDeposit('ARS', 1000, 'debin')
```

#### Get Cryptocurrency Wallets

```
const assetWallets = await client.getAssetWallets()
```

#### Create Cash Withdrawal Instructions

```
const label = 'Local Bank'
const body = {
  name: "John Doe",
  city: "Buenos Aires",
  phone: "12341234",
  cuit: "12341234",
  address: "My Address 123",
  bank: "hsbc",
  bank_account_number: "12341234",
  cbu: "1234123412341234",
  account_type: "savings",
  currency: "ARS",
  country: "AR",
  payment_method: "domestic_bank"
}

const newWithdrawalInstruction = await client.createWithdrawalInstructions(label, body)
```

#### Get Cash Withdrawal Instructions

```
const withdrawalInstructions = await client.getWithdrawalInstructions()

/*
 * @param {string} ids
 */
const withdrawalInstruction = await client.getWithdrawalInstructions('12')
```

#### Delete a Cash Withdrawal Instruction
```
const withdrawalInstruction = await client.deleteWithdrawalInstructions('12')
```

#### Ask a Cash Withdrawal

```
const withdrawalInstruction = await client.getWithdrawalInstructions('12')

const newCashWithdrawal = await client.createCashWithdrawal('ars', 100, withdrawalInstruction)
```

#### Ask a Coin Withdrawal

```
/*
 * @param {string} currency
 * @param {Number} amount
 * @param {string} label
 * @param {string} address
 */
const newCoinWithdrawal = await client.createCoinWithdrawal('btc', 12.3456789, 'Trezor', 'mszEUK9E6E7n4SNcrjYH8Fr7ZTGP9n3dRb')
```

### Buying/Selling Bots
A Buying or Selling Bot is a bot that performs the action of buying or selling the money you specify in a certain period of time. It divides the amount to buy/sell and performs the actions in smaller chunks, looking for better prices.

#### Get Buying Bots

```
const buyingBots = await client.getBuyingBots()
const buyingBot = await client.getBuyingBot('14')
```

#### Create a Buying Bot

```
/*
 * @param {Number} amount
 * @param {string} orderbookId
 */
const buyingBot = await client.createBuyingBot(100, '1')
```

#### Cancel a Buying Bot

```
/*
 * @param {string} id
 */
const buyingBot = await client.cancelBuyingBot('14')
```

#### Get Selling Bots

```
const sellingBots = await client.getSellingBots()
const sellingBot = await client.getSellingBot('14')
```

#### Create a Selling Bot

```
/*
 * @param {Number} amount
 * @param {string} orderbookId
 */
const sellingBot = await client.createSellingBot(100, '1')
```

#### Cancel a Selling Bot

```
/*
 * @param {string} id
 */
const sellingBot = await client.cancelSellingBot('14')
```

### Merchants

This section is for stores that accept (or want to accept) BTC as a payment method.

### Get all Payments

```
const payments = await client.getPayments()
```

### Get Payment Detail

```
const payment = await client.getPayment(1)
```

### Register a new Payment

```
/*
 * @param {Number} amount
 * @param {Number} keep (percentage to keep in BTC)
 * @param {Number} currency ('1' = BTC)
 * @param {string} callback_url (callback to ping with the information when the payment arrives)
 * @param {string} customer_reference
 * @param {string} merchant_reference
 */
const payment = await client.createPayment(200, 10, '1', 'https://mystore.com/webhook', 'Purchase at My Store', 'Sale id: 2212')
```

### Create a POS (Point Of Sale)

```
/*
 * @param {Number} keep (percentage to keep in BTC)
 * @param {string} merchant_logo
 * @param {string} merchant_name
 * @param {string} merchant_site
 * @param {string} merchant_slug
 */
const pos = await client.createPOS(10, 'https://mystore.com/logo.png', 'My Store', 'https://mystore.com', 'my-store')
```

## Support
For any issues with the API or this SDK, please reach us hola@bitex.la
