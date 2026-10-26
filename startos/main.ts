import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  chosenIndexer,
  chosenOllama,
  dataMounts,
  runAs,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Proof of Basis'))

  // The app takes these as defaults for its own settings ("Found on your
  // node"); anything the user saved in the app wins.
  const indexer = await chosenIndexer(effects)
  const ollama = await chosenOllama(effects)
  const env: Record<string, string> = {}
  if (indexer) env.BTCTAX_ELECTRUM_URL = `tcp://${indexer.addr}`
  if (ollama) env.BTCTAX_OLLAMA_URL = `http://${ollama}`

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'proof-of-basis' },
      dataMounts,
      'proof-of-basis-sub',
    ),
    exec: { command: sdk.useEntrypoint(), env, user: runAs },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
