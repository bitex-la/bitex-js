Bitex-js
========

Bitex SDK in Javascript

If you prefer to use a custom client, you can get the API documentation at https://developers.bitex.la

## Usage

For the examples, we are using ES2017 async/await syntax. For previous versions of the standard, you can safely use Promises.

To see which fields are in each model, please refer to [models.js](src/models.js).

For more use cases, you can check out the [specs](test)


### Initialization

```js
let client = new Bitex({apiKey: 'valid_api_key'})
```

To get your Api Key, please sign up in https://bitex.la and go to https://bitex.la/developers

### Orderbooks

```js
/**
 * Get all Orderbooks.
 */
async getOrderbooks()
```

### Market Data

```js
/**
 * Get Market information.
 * @param {string} orderbook_code
 */
async getMarket(orderbook_code)
```

#### Market Ticker

```js
/**
 * Get tickers of all available orderbooks
 */
async getTickers()

/**
 * Get ticker of a specific orderbook
 * @param {string} orderbook_code
 */
async getTicker(orderbook_code)
```

#### Get last Transactions

```js
/**
 * Get transactions.
 * @param {string} [orderbook_code]
 * @param {number} [hours] - Number of hours ago to get the transactions from.
 */
async getTransactions(orderbook_code, hours)

/**
 * Get a specific transaction.
 * @param {number} id
 */
async getTransaction(id)
```

#### Market Candles

```js
/**
 * Get candles for a specific orderbook
 * @param {string} [orderbook_code]
 * @param {number} [days] - Number of days ago to start the candles from.
 * @param {number} [span] - Amount of hours for each candle.
 */
async getCandles(orderbook_code, days, span)
```

### Trading

#### Create Ask

```js
/**
 * Create an Ask.
 * An Ask is a Sell order to be executed in the orderbook.
 * @param {string} orderbook_code
 * @param {number} price
 * @param {number} amount - The amount is in _base_ quote (BTC generally)
 */
async createAsk(orderbook_code, price, amount)
```

#### Get Asks

```js
/**
 * Get all own Asks.
 * @param {string} [orderbook_code]
 */
async getAsks(orderbook_code)

/**
 * Get a specific Ask.
 * @param {number} id
 */
async getAsk(id)
```

#### Cancel Ask

```js
/**
 * Cancel an Ask.
 * @param {number} id
 */
async cancelAsk(id)
```

#### Create Bid

```js
/**
 * Create a Bid.
 * An Bid is a Buy order to be executed in the orderbook.
 * @param {string} orderbook_code
 * @param {number} price
 * @param {number} amount - The amount is in _quote_ currency (fiat generally)
 */
async createBid(orderbook_code, price, amount)
```

#### Get Bids

```js
/**
 * Get all own Bids.
 * @param {string} [orderbook_code]
 */
async getBids(orderbook_code)

/**
 * Get a specific Bid.
 * @param {number} id
 */
async getBid(id)
```

#### Cancel Bid

```js
/**
 * Cancel a Bid.
 * @param {number} id
 */
async cancelBid(id)
```

#### Get all my Orders

```js
/**
 * Get own Orders.
 * Orders are both Bids and Asks.
 */
async getOrders()
```

#### Cancel all my orders

```js
/**
 * Cancel all Orders.
 * @param {string} [orderbook_code] - If no orderbook code is provided, this
 * will cancel all orders in all orderbooks.
 * Take into account that some or all the Orders could have been matched just
 * before this request, and therefore the cancel had no effect. It is
 * recommended to check the status of the Bids and Asks to obtain the final
 * execution status.
 */
async cancelOrders(orderbook_code)
```

#### Get Trades

```js
/**
 * Get own trades (Buys & Sells).
 * @param {string} [orderbook_code]
 * @param {number} [days] - Number of days ago to get the trades from.
 * @param {number} [limit] - Max quantity of trades to retrieve.
 */
async getTrades(orderbook_code, days, limit)
```

#### Get Buys

```js
/**
   * Get own buys.
   * @param {string} [orderbook_code]
   * @param {number} [days] - Number of days ago to get the trades from.
   * @param {number} [limit] - Max quantity of trades to retrieve.
   */
  async getBuys(orderbook_code, days, limit)
```

#### Get Sells

```js
/**
 * Get own sells.
 * @param {string} [orderbook_code]
 * @param {number} [days] - Number of days ago to get the trades from.
 * @param {number} [limit] - Max quantity of trades to retrieve.
 */
async getSells(orderbook_code, days, limit)
```

### Movements

These include Deposits, Withdrawals, Buys and Sells.

```js
/**
 * Get last movements.
 */
async getMovements()
```

### Account

Within the account are the current balances, movements and pending movements.

```js
/**
 * Get account information and balances.
 */
async getAccount()
```

### Deposit/Withdraw

#### Get Cash Wallet

```js
/**
 * Get Cash Wallets and balances.
 */
async getCashWallets()

/**
 * Get a specific Cash Wallet.
 * @param {string} currency_code - One of: 'USD', 'ARS', 'CLP', 'PYG' & 'UYU'.
 */
async getCashWallet(currency_code)
```

#### Get Coin Wallets

```js
/**
 * Get Coin Wallets (with its addresses) and balances
 */
async getCoinWallets()

/**
 * Get a specific Coin Wallet (with its addresses) and balances.
 * @param {number} id
 */
async getCoinWallet(id)
```

#### Get Cash Deposits

```js
/**
 * Get Cash Deposits.
 */
async getCashDeposits()

/**
 * Get a specific Cash Deposit.
 * @param {number} id
 */
async getCashDeposit(id)
```

#### Get Coin Deposits

```js
/**
 * Get Coin Deposits.
 */
async getCoinDeposits()

/**
 * Get a specific Coin Deposit.
 * @param {number} id
 */
async getCoinDeposit(id)
```

#### Create Cash Withdrawal Instructions

```js
/**
 * Create Withdrawal Instruction
 * @param {string} label
 * @param {object} body - See updated documentation of valid body structures
 * on https://developers.bitex.la/#29243a11-90f1-4b15-9cc8-eec12b550c0b
 */
async createWithdrawalInstructions(label, body)
```

#### Get Cash Withdrawal Instructions

```js
/**
 * Get all Withdrawal Instructions.
 */
async getWithdrawalInstructions()

/**
 * Get a specific Withdrawal Instruction.
 * @param {number} id
 */
async getWithdrawalInstruction(id)
```

#### Delete a Cash Withdrawal Instruction

```js
/**
 * Delete Withdrawal Instruction.
 * @param {number} id
 */
async deleteWithdrawalInstructions(id)
```

#### Create Cash Withdrawal

```js
/**
 * Create Cash Withdrawal.
 * @param {string} fiat_code - Possible values: 'USD', 'ARS', 'CLP', 'PYG' and
 * 'UYU'.
 * @param {number} amount
 * @param {WithdrawalInstruction} withdrawal_instruction
 * @param {string} otp - One time password obtained from the 2FA (Google
 * Authenticator)
 */
async createCashWithdrawal(fiat_code, amount, withdrawal_instruction, otp)
```

#### Get Cash Withdrawals

```js
/**
 * Get all Cash Withdrawals.
 */
async getCashWithdrawals()

/**
 * Get a specific Cash Withdrawal.
 * @param {number} id
 */
async getCashWithdrawal(id)
```

#### Create Coin Withdrawal

```js
/**
 * Create Coin Withdrawal
 * @param {string} coin_code - Possible values: 'BTC' and 'BCH'
 * @param {number} amount
 * @param {string} label
 * @param {string} to_addresses
 * @param {string} otp - One time password obtained from the 2FA (Google
 * Authenticator)
 */
async createCoinWithdrawal(coin_code, amount, label, to_addresses, otp)
```

#### Get Coin Withdrawals

```js
/**
 * Get all Coin Withdrawals.
 */
async getCoinWithdrawals()

/**
 * Get a specific Coin Withdrawal.
 * @param {number} id
 */
async getCoinWithdrawal(id)
```

### Buying/Selling Bots
A Buying or Selling Bot is a bot that performs the action of buying or selling 
the money you specify in a certain period of time. It divides the amount to 
buy/sell and performs the actions in smaller chunks, looking for better prices.

#### Get Buying Bots

```js
/**
 * Get Buying Bots.
 */
async getBuyingBots()

/**
 * Get a specific Buying Bot.
 * @param {number} id
 */
async getBuyingBot(id)
```

#### Create a Buying Bot

```js
/**
 * Create a Buying Bot.
 * A Buying Bot will take an amount and an orderbook and will try to buy the
 * _base_ asset (crypto asset, in general) with the specified amount of the
 * _quote_ asset (fiat asset, in general).
 * The strategy used by the buying bot is to buy in little chunks over time
 * and only if the spread is less than 1%. This prevents the buyer to pay an
 * abnormal high price.
 * @example
 * //Buy 100 USD in BTC
 * createBuyingBot(100, Orderbooks.BTCUSD)
 * @param {number} amount
 * @param {string} orderbook_code
 */
async createBuyingBot(amount, orderbook_code)
```

#### Cancel a Buying Bot

```js
/**
 * Cancel a Buying Bot.
 * The orders executed by the bot will not be cancelled, but it won't create
 * any more.
 * @param {number} id
 */
async cancelBuyingBot(id)
```

#### Get Selling Bots

```js
/**
 * Get Selling Bots.
 */
async getSellingBots()

/**
 * Get a specific Selling Bot.
 * @param {number} id
 */
async getSellingBot(id)
```

#### Create a Selling Bot

```js
/**
 * Create a Selling Bot.
 * A Selling Bot will take an amount and an orderbook and will try to sell the
 * specified amount of _base_ asset (crypto asset, in general) in order to get
 * _quote_ asset.
 * The strategy used by the selling bot is to sell in little chunks over time
 * and only if the spread is less than 1%. This prevents the seller to get an
 * abnormal low price.
 * @example
 * //Sell 1 BTC into USD
 * createSellingBot(1, Orderbooks.BTCUSD)
 * @param {number} amount
 * @param {string} orderbook_code
 */
async createSellingBot(amount, orderbook_code)
```

#### Cancel a Selling Bot

```js
/**
 * Cancel a Selling Bot.
 * The orders executed by the bot will not be cancelled, but it won't create
 * any more.
 * @param {number} id
 */
async cancelSellingBot(id)
```

### Merchants

This section is for stores that accept (or want to accept) BTC as a payment method.

#### Get Payments

```js
/**
 * Get all Payments.
 */
async getPayments()

/**
 * Get a specific Payment.
 * @param {number} id
 */
async getPayment(id)
```

#### Register a new Payment

```js
/**
 * Create a new Payment.
 * @param {number} amount - Amount in cash to be paid.
 * @param {number} keep - Percentage to keep in BTC. If not specified, it will
 * take the merchant's general 'keep' configuration or 0 otherwise.
 * @param {string} currency_code - Possible values: 'BTC', 'USD', 'ARS',
 * 'CLP', 'PYG' and 'UYU'
 * @param {string} callback_url - URL to be notified when the status of this
 * payment changes.
 * @param {*} customer_reference - Reference to show to the customer.
 * @param {*} merchant_reference - Internal reference for the merchant.
 */
async createPayment(amount, keep, currency_code, callback_url, 
  customer_reference, merchant_reference)
```

#### Create a POS (Point Of Sale)

```js
/**
 * Create a Point of Sale.
 * Note: This can be configured manually from the web and is commonly set only
 * once. Use this method if you are providing a service for multiple
 * merchants.
 * @param {number} merchant_keep - Percentage to keep in BTC from each sale.
 * @param {string} merchant_logo - URL of the logo image.
 * @param {string} merchant_name - Name of the merchant.
 * @param {string} merchant_site - @deprecated URL of the Merchant.
 * @param {*} merchant_slug - @deprecated Slug to be used in Bitex POS for the
 * merchant.
 */
async createPOS(
  merchant_keep, merchant_logo, merchant_name, merchant_site, merchant_slug
)
```

### Api Keys

#### Get Api Keys

```js
/**
 * Get all Api Keys.
 */
async getApiKeys()

/**
 * Get a specific Api Key.
 * @param {number} id
 */
async getApiKey(id)
```

#### Create an Api Key

```js
/**
 * Create a new Api Key.
 * @param {boolean} write - Permission to write. If FALSE provided, the ApiKey
 * will be read-only. @default false.
 * @param {string} otp - One time password obtained from the 2FA (Google
 * Authenticator)
 */
async createApiKey(write = false, otp = '')
```

#### Revoke an Api Key

```js
/**
 * Revoke an Api Key.
 * After doing this action, the Api Key will no longer work.
 * @param {number} id
 */
async deleteApiKey(id)
```

## Support
For any issues with the API or this SDK, please reach us at hola@bitex.la
