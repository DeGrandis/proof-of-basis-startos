import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  indexer: Value.select({
    name: i18n('Electrum server'),
    description: i18n(
      'Where Proof of Basis looks up your wallets. Automatic uses Fulcrum if it is installed, otherwise Electrs.',
    ),
    values: {
      auto: i18n('Automatic'),
      fulcrum: i18n('Fulcrum'),
      electrs: i18n('Electrs'),
      none: i18n('None (I will set one in the app, or not use wallets)'),
    },
    default: 'auto',
  }),
  ollama: Value.toggle({
    name: i18n('Use Ollama for the assistant'),
    description: i18n(
      'When Ollama is installed on this server, the assistant uses it.',
    ),
    default: true,
  }),
})

export const nodeServices = sdk.Action.withInput(
  'node-services',

  {
    name: i18n('Node Services'),
    description: i18n(
      'Choose which services on this server Proof of Basis connects to. A server you set in the app itself takes precedence.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },

  inputSpec,

  async ({ effects }) => {
    const s = await storeJson.read().once()
    return { indexer: s?.indexer ?? 'auto', ollama: s?.ollama ?? true }
  },

  // Saving restarts the service with the new addresses.
  async ({ effects, input }) => storeJson.merge(effects, input),
)
