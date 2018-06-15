export class Account {
  constructor(){
    this.price = null
    this.amount = null
    this.balances = null
    this.country = null
    this.user = null
    this.pending_movements = []
    this.movements = []
  }
}

export class Ask {
  constructor(){
    this.amount = null
    this.remaining_amount = null
    this.price = null,
    this.orderbook = null
    this.user = null
  }

  static path({ orderbook_code }){
    return `markets/${orderbook_code}/asks`
  }
}

export class AssetWallet {
  constructor(){
    this.address = null
    this.auto_sell_address = null
    this.balance = null
    this.available = null
    this.currency = null
  }
}

export class Bank {
  constructor(){
    this.name = null
    this.value = null
    this.country = null
  }
}

export class Bid {
  constructor(){
    this.amount = null
    this.remaining_amount = null
    this.price = null,
    this.orderbook = null
    this.user = null
  }

  static path({ orderbook_code }){
    return `markets/${orderbook_code}/bids`
  }
}

export class CancelStatus {
  constructor(){
    this.text = null
    this.value = null
  }
}

export class Candle {
  constructor(){
    this.timestamp = null
    this.close = null
    this.open = null
    this.high = null
    this.low = null
    this.vwap = null
    this.volume = null
    this.price_before_last = null
  }

  static path({ orderbook_code }){
    return `markets/${orderbook_code}/candles`
  }
}

export class CashDeposit {
  constructor(){
    this.requested_amount = null
    this.deposit_method = null
    this.receipt_file_name = null
    this.receipt_base64 = null
    this.requested_currency = null
    this.request_details = null
  }
}

export class CashDepositMethod {
  constructor(){
    this.code = null
    this.options = null
  }
}

export class CashWithdrawal {
  constructor(){
    this.amount = null
    this.fiat = null
    this.label = null
    this.status = null
    this.created_at = null
    this.payment_method = null
    this.withdrawal_instruction = null
  }
}

export class CoinWithdrawal {
  constructor(){
    this.currency = null
    this.amount = null
    this.label = null
    this.to_addresses = null
  }
}

export class ContactRequest {
  constructor(){
    this.email = null
    this.phone = null
    this.name = null
    this.extra_data = null
  }
}

export class Country {
  constructor(){
    this.code = null
    this.name = null
  }
}

export class Emission {
  constructor(){
    this.sent = null
    this.currency = null
    this.date = null
    this.broker = null
  }
}

export class Market {
  constructor(){
    this.bids = []
    this.asks = []
    this.transactions = []
    this.candles = []
  }
}

export class Movement {
  constructor(){
    this.timestamp = null
    this.currencies_involved = null
    this.currency = null
    this.amount = null
    this.fee = null
    this.fee_decimals = null
    this.fee_currency = null
    this.price = null
    this.price_decimals = null
    this.kind = null
  }
}

export class Notification {
  constructor(){
    this.count = null
  }
}

export class Orderbook {
  constructor(){
    this.code = null
    this.base = null
    this.quote = null
  }
}

export class OrderGroup {
  constructor(){
    this.price = null
    this.amount = null
  }
}

export class Purchase {
  constructor(){
    this.taken = null
    this.given = null
    this.currency = null
    this.date = null
    this.broker = null
  }
}

export class PurchaseIntention {
  constructor(){
    this.requested_currency = null
    this.requested_amount = null
    this.created_at = null
  }
}

export class Reception {
  constructor(){
    this.received = null
    this.currency = null
    this.date = null
    this.broker = null
  }
}

export class Sale {
  constructor(){
    this.taken = null
    this.given = null
    this.currency = null
    this.date = null
    this.broker = null
  }
}

export class Ticker {
  constructor(){
    this.last = null
    this.open = null
    this.high = null
    this.low = null
    this.vwap = null
    this.volume = null
    this.bid = null
    this.ask = null
    this.price_before_last = null
  }
}

export class Transaction {
  constructor(){
    this.timestamp = null
    this.amount = null
    this.price = null
  }

  static path({ orderbook_code }){
    return `markets/${orderbook_code}/transactions`
  }
}

export class User {
  constructor(){
    this.name = null
    this.email = null
    this.kyc_accepted = null
    this.kyc_pending = null
    this.otp_enabled = null
    this.do_not_email = null
    this.password = null
    this.password_confirmation = null
    this.trezor_login_enabled = null
  }
}

export class UserCoinAddressBookEntry {
  constructor(){
    this.coin = null
    this.label = null
    this.to_addresses = null
  }
}

export class WithdrawalInstruction {
  constructor(){
    this.label = null
    this.body = null
  }
}
