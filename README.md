# Proof of Basis for StartOS

The StartOS 0.4 package for [Proof of Basis](https://github.com/DeGrandis/proof-of-basis):
your bitcoin cost basis and tax records, kept on your node.

## What it does on StartOS

- Runs the release image `ghcr.io/degrandis/proof-of-basis`, built for x86_64 and
  aarch64 from the app's repository, pinned by digest.
- Hands the app the server's own services as setting defaults:
  `BTCTAX_ELECTRUM_URL` from Fulcrum or Electrs, and `BTCTAX_OLLAMA_URL` from
  Ollama. All three are optional dependencies, enforced only while in use.
- Keeps the app's data (one SQLite file) in the `main` volume, and the package's
  own choices in `startos`. Both are backed up.
- Actions: **Node Services** (which indexer, whether to use Ollama) and
  **Reset Password** (runs `btctax reset-password`).

## Building

You need Docker, Make, Node.js 22, jq and
[start-cli](https://docs.start9.com/packaging/0.4.0.x/environment-setup.html).

```
npm ci
make x86      # proof-of-basis_x86_64.s9pk
make arm      # proof-of-basis_aarch64.s9pk
```

Sideload the `.s9pk` from the StartOS web interface (**Sideload** in the top
bar), or install it from the command line with `make install` (see the
[Makefile docs](https://docs.start9.com/packaging/0.4.0.x/makefile.html)).

## Updating to a new release

1. Tag the release in the app's repository (`git tag v0.2.0`); its build
   publishes `ghcr.io/degrandis/proof-of-basis:0.2.0`.
2. Find the multi-arch index digest:
   `docker buildx imagetools inspect ghcr.io/degrandis/proof-of-basis:0.2.0`
3. Update `dockerTag` in `startos/manifest/index.ts`, and add a version file in
   `startos/versions/` (`0.2.0:0`) with its release notes.

## Layout

```
startos/manifest/   id, title, image, volumes
startos/main.ts     the daemon, its environment and health check
startos/utils.ts    finding Fulcrum, Electrs and Ollama on the server
startos/dependencies.ts
startos/actions/    Node Services, Reset Password
startos/interfaces.ts, backups.ts, init/, versions/, fileModels/
instructions.md     shown to users in StartOS
```
