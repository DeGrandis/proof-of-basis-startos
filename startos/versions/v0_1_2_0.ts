import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_1_2_0 = VersionInfo.of({
  version: '0.1.2:0',
  releaseNotes: {
    en_US: 'First release for StartOS.',
    es_ES: 'Primera versión para StartOS.',
    de_DE: 'Erste Version für StartOS.',
    pl_PL: 'Pierwsze wydanie dla StartOS.',
    fr_FR: 'Première version pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
