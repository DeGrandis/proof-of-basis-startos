import { T } from '@start9labs/start-sdk'
import {
  electrsDescription,
  fulcrumDescription,
  ollamaDescription,
} from './manifest/i18n'
import { sdk } from './sdk'
import { chosenIndexer, chosenOllama } from './utils'

// All optional: the app works from exchange files alone. A dependency is only
// enforced (must be running) while the app is actually using it.
const usingIndexer =
  (id: string) =>
  async ({ effects }: { effects: T.Effects }) =>
    (await chosenIndexer(effects))?.indexer === id

const fulcrum = sdk.Dependency.optional('fulcrum', {
  description: fulcrumDescription,
  metadata: {
    title: 'Fulcrum',
    icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/master/icon.png',
  },
  versionRange: '>=2.1.1:8',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: usingIndexer('fulcrum'),
})

const electrs = sdk.Dependency.optional('electrs', {
  description: electrsDescription,
  metadata: {
    title: 'Electrs',
    icon: 'https://raw.githubusercontent.com/Start9Labs/electrs-startos/refs/heads/master/icon.svg',
  },
  versionRange: '>=0.11.1:11',
  kind: 'running',
  healthChecks: ['electrs'],
  enabled: usingIndexer('electrs'),
})

const ollama = sdk.Dependency.optional('ollama', {
  description: ollamaDescription,
  metadata: {
    title: 'Ollama',
    icon: 'https://raw.githubusercontent.com/Start9Labs/ollama-startos/master/icon.svg',
  },
  versionRange: '>=0.31.2:2',
  kind: 'running',
  healthChecks: ['primary'],
  enabled: async ({ effects }) => !!(await chosenOllama(effects)),
})

export const dependencies = sdk.Dependencies.of()
  .addDependency(fulcrum)
  .addDependency(electrs)
  .addDependency(ollama)
