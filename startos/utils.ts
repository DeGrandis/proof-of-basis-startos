import { T } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

// The app listens here inside its container (BTCTAX_ADDR in the image).
export const uiPort = 8080

export type Indexer = 'fulcrum' | 'electrs'
export type IndexerChoice = 'auto' | Indexer | 'none'

// Electrs and Fulcrum both serve plaintext Electrum on 50001; Electrs binds it
// under host `electrum`, Fulcrum under host `main`.
const INDEXER_HOSTS: Record<Indexer, string> = {
  fulcrum: 'main',
  electrs: 'electrum',
}
const electrumPort = 50001

// Ollama's API, as ollama-startos binds it.
const ollamaHostId = 'api-multi'
const ollamaPort = 11434

const indexerBridge = (effects: T.Effects, indexer: Indexer) =>
  sdk.host
    .getBridgeAddress(effects, {
      packageId: indexer,
      hostId: INDEXER_HOSTS[indexer],
      internalPort: electrumPort,
      ssl: false,
    })
    .const()

/**
 * The indexer in use and its bridge address (`<ip>:<port>`), or null when
 * there's none. "auto" takes Fulcrum when it's installed, then Electrs. Each
 * address read is reactive: installing or removing an indexer restarts the
 * service with the new address.
 */
export async function chosenIndexer(
  effects: T.Effects,
): Promise<{ indexer: Indexer; addr: string } | null> {
  const choice =
    (await storeJson.read((s) => s.indexer).const(effects)) ?? 'auto'
  if (choice === 'none') return null
  const order: Indexer[] = choice === 'auto' ? ['fulcrum', 'electrs'] : [choice]
  for (const indexer of order) {
    const addr = await indexerBridge(effects, indexer)
    if (addr) return { indexer, addr }
  }
  return null
}

/** Ollama's bridge address, or null when it's turned off or not installed. */
export async function chosenOllama(effects: T.Effects): Promise<string | null> {
  if (!(await storeJson.read((s) => s.ollama).const(effects))) return null
  return sdk.host
    .getBridgeAddress(effects, {
      packageId: 'ollama',
      hostId: ollamaHostId,
      internalPort: ollamaPort,
    })
    .const()
}

/**
 * The data volume at /data. StartOS mounts volumes owned by root and the image
 * runs as 65532 with no shell to chown with, so the mount maps root to 65532.
 */
export const dataMounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: '/data',
  readonly: false,
  idmap: [{ fromId: 0, toId: 65532 }],
})
