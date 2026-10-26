import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

// Writes store.json with its defaults (automatic indexer, Ollama on) when it's
// missing, and fills in any field a later version adds.
export const seedFiles = sdk.setupOnInit(async (effects) => {
  await storeJson.merge(effects, {})
})
