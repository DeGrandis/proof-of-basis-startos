import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// StartOS-side choices, kept apart from the app's own data: which Electrum
// server to hand the app, and whether to hand it Ollama. The addresses they
// resolve to are looked up at each start (see utils.ts).
const shape = z.looseObject({
  indexer: z.enum(['auto', 'fulcrum', 'electrs', 'none']).catch('auto'),
  ollama: z.boolean().catch(true),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: '/store.json' },
  shape,
)
