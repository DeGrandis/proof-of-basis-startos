import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'proof-of-basis',
  title: 'Proof of Basis',
  license: 'Proprietary',
  packageRepo: 'https://github.com/DeGrandis/proof-of-basis-startos',
  upstreamRepo: 'https://github.com/DeGrandis/proof-of-basis',
  marketingUrl: 'https://proofofbasis.degrand.is',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'startos'],
  images: {
    'proof-of-basis': {
      // The 0.1.0 release, pinned by its multi-arch (amd64 + arm64) digest.
      source: {
        dockerTag:
          'ghcr.io/degrandis/proof-of-basis:0.1.0@sha256:511caf1eea00a7eab89cf006851ce63ca2927d7453177ddb2679b0c2f5679cb0',
      },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: false,
    },
  },
})
