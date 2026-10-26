import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import { chosenIndexer, chosenOllama } from './utils'

// All optional (see the manifest): the app works from exchange files alone. A
// dependency is only required (must be running) while the app is using it.
export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const deps = {} as Record<
    'fulcrum' | 'electrs' | 'ollama',
    T.DependencyRequirement
  >

  const indexer = await chosenIndexer(effects)
  if (indexer?.indexer === 'fulcrum') {
    deps.fulcrum = {
      id: 'fulcrum',
      kind: 'running',
      versionRange: '>=2.1.1:8',
      healthChecks: ['primary'],
    }
  } else if (indexer?.indexer === 'electrs') {
    deps.electrs = {
      id: 'electrs',
      kind: 'running',
      versionRange: '>=0.11.1:11',
      healthChecks: ['electrs'],
    }
  }

  if (await chosenOllama(effects)) {
    deps.ollama = {
      id: 'ollama',
      kind: 'running',
      versionRange: '>=0.31.2:2',
      healthChecks: ['primary'],
    }
  }

  return deps
})
