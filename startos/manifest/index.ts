import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

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
      description: {
        en_US:
          'Optional: looks up your wallets on your own node. Used automatically when installed.',
      },
      optional: true,
      metadata: {
        title: 'Fulcrum',
        icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/master/icon.png',
      },
    },
    electrs: {
      description: {
        en_US:
          'Optional: looks up your wallets on your own node. Used automatically when installed and Fulcrum is not.',
      },
      optional: true,
      metadata: {
        title: 'Electrs',
        icon: 'https://raw.githubusercontent.com/Start9Labs/electrs-startos/refs/heads/master/icon.svg',
      },
    },
    ollama: {
      description: {
        en_US:
          'Optional: runs the assistant that answers questions about your records. Used automatically when installed.',
      },
      optional: true,
      metadata: {
        title: 'Ollama',
        icon: 'https://raw.githubusercontent.com/Start9Labs/ollama-startos/master/icon.svg',
      },
    },
  },
})
