export const DEFAULT_LANG = 'en_US'

const dict = {
  // actions/nodeServices.ts
  'Electrum server': 0,
  'Where Proof of Basis looks up your wallets. Automatic uses Fulcrum if it is installed, otherwise Electrs.': 1,
  Automatic: 2,
  Fulcrum: 3,
  Electrs: 4,
  'None (I will set one in the app, or not use wallets)': 5,
  'Use Ollama for the assistant': 6,
  'When Ollama is installed on this server, the assistant uses it.': 7,
  'Node Services': 8,
  'Choose which services on this server Proof of Basis connects to. A server you set in the app itself takes precedence.': 9,

  // actions/resetPassword.ts
  'Reset Password': 10,
  'Clear the Proof of Basis password if you have forgotten it. Your records are kept.': 11,
  'Signs out every device. The next person to open Proof of Basis chooses the new password, so open it right away.': 12,
  'Password Cleared': 13,
  'Open Proof of Basis to choose a new password. Your records are unchanged.': 14,

  // interfaces.ts
  'Web UI': 15,
  'Your bitcoin cost basis and tax records': 16,

  // main.ts
  'Starting Proof of Basis': 17,
  'Web Interface': 18,
  'The web interface is ready': 19,
  'The web interface is not ready': 20,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
