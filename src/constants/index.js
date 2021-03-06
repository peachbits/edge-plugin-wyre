// @flow
export const INITIAL_KEYS = [
  'wyreAccountId',
  'wyreAccountStatus',
  'wyreAccountId_id',
  'wyrePaymentMethodId',
  'wyreNetworkTxId',
  'wyreAccountName',
  'wyreBTC',
  'wyreETH'
]

export const APPROVED: string = 'APPROVED'
export const PENDING: string = 'PENDING'
export const AWAITING_FOLLOWUP: string = 'AWAITING_FOLLOWUP'
export const REJECTED: string = 'REJECTED'
export const NOT_STARTED: string = 'NOT_STARTED'

export const SUPPORTED_DIGITAL_CURRENCIES = [
  'BTC', 'ETH', 'DAI'
]

export const SUPPORTED_FIAT_CURRENCIES = [
  'USD', 'EUR'
]
