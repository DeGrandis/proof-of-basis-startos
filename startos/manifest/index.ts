import { setupManifest } from '@start9labs/start-sdk'
import {
  electrsDescription,
  fulcrumDescription,
  long,
  ollamaDescription,
  short,
} from './i18n'

export const manifest = setupManifest({
  id: 'proof-of-basis',
  title: 'Proof of Basis',
  license: 'MIT',
  packageRepo: 'https://github.com/DeGrandis/proof-of-basis-startos',
  upstreamRepo: 'https://github.com/DeGrandis/proof-of-basis',
  marketingUrl: 'https://proofofbasis.degrand.is',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'startos'],
  images: {
    'proof-of-basis': {
      // The 0.1.2 release, pinned by its multi-arch (amd64 + arm64) digest.
      source: {
        dockerTag:
          'ghcr.io/degrandis/proof-of-basis:0.1.2@sha256:4f126ef7d0a925db29cc06a86a5904f75048ce99a661c5d942bc4cfe036fb834',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    fulcrum: {
      description: fulcrumDescription,
      optional: true,
      metadata: {
        title: 'Fulcrum',
        icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/master/icon.png',
      },
    },
    electrs: {
      description: electrsDescription,
      optional: true,
      metadata: {
        title: 'Electrs',
        icon: 'https://raw.githubusercontent.com/Start9Labs/electrs-startos/refs/heads/master/icon.svg',
      },
    },
    ollama: {
      description: ollamaDescription,
      optional: true,
      metadata: {
        title: 'Ollama',
        icon: 'https://raw.githubusercontent.com/Start9Labs/ollama-startos/master/icon.svg',
      },
    },
  },
})
