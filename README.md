<p align="center">
  <img src="icon.svg" alt="Proof of Basis Logo" width="21%">
</p>

# Proof of Basis on StartOS

> Everything not listed in this document should behave the same as upstream
> Proof of Basis. If a feature, setting, or behavior is not mentioned here,
> the upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Proof of Basis](https://github.com/DeGrandis/proof-of-basis) keeps your bitcoin cost basis and tax records: wallets read from your own node, exchange exports, the basis of every coin, and gains and income for each year. This package runs it on StartOS and connects it to the server's own Electrum indexer and Ollama.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The package runs upstream's own release image, unmodified, pinned by its multi-arch digest.

| What          | Value                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| Image         | `ghcr.io/degrandis/proof-of-basis`, built by upstream's release workflow |
| Architectures | x86_64, aarch64                                                          |
| Entrypoint    | The image's own (`/btctax`)                                              |
| User          | root (`0:0`) inside the service's unprivileged container                 |

Subcontainers:

- `proof-of-basis-sub` runs the app (daemon `primary`).
- `reset-password` is a temporary subcontainer that the **Reset Password** action starts and removes.

The image's own user is 65532, but StartOS volumes are owned by root, so the app runs as root.

## Volume and Data Layout

There are two volumes, and both are backed up. Only `main` is mounted into the app.

| Volume    | Mount point | Holds                                                                                              |
| --------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `main`    | `/data`     | The app's SQLite database `btctax.db` (records, settings, the password hash) and kept import files |
| `startos` | not mounted | `store.json`, the package's own choices (see [File Models](#file-models))                          |

Nothing else is mounted, so a path the app is given outside `/data` is in the container's own filesystem.

## File Models

The package owns one file, `store.json` in the `startos` volume. It holds StartOS-side choices, not the app's configuration.

| Key       | Values                               | Default |
| --------- | ------------------------------------ | ------- |
| `indexer` | `auto`, `fulcrum`, `electrs`, `none` | `auto`  |
| `ollama`  | `true`, `false`                      | `true`  |

It is seeded with these defaults at init, and an invalid value is reset to its default. Only the **Node Services** action rewrites it. A hand edit survives, and restarts the service with the new choice.

From these choices the package sets two environment variables on every start:

- `BTCTAX_ELECTRUM_URL`: `tcp://<address>` of the chosen indexer, or unset.
- `BTCTAX_OLLAMA_URL`: `http://<address>` of Ollama, or unset.

The app reads them on every launch as defaults for its own settings, and shows them as **Found on your node**. A server the user saves in the app's Settings is stored in its database and always wins. The package never writes the app's own settings.

## Dependencies

All three dependencies are optional. Each is enforced (installed and running, with the health check below passing) only while the app is using it.

| Dependency | When it is used                                                          | Health check | Reached at                             |
| ---------- | ------------------------------------------------------------------------ | ------------ | -------------------------------------- |
| Fulcrum    | `indexer` is `fulcrum`, or `auto` with Fulcrum installed                 | `primary`    | host `main`, port 50001, plain TCP     |
| Electrs    | `indexer` is `electrs`, or `auto` with Electrs installed and Fulcrum not | `electrs`    | host `electrum`, port 50001, plain TCP |
| Ollama     | `ollama` is `true` and Ollama is installed                               | `primary`    | host `api-multi`, port 11434, HTTP     |

Each is found through its bridge address, and the lookup is reactive: installing or removing one restarts the service with the new address. No dependency volume is mounted.

## Network Access and Interfaces

The package exposes one interface.

| Id   | Type | Port | Protocol | Serves                                                 |
| ---- | ---- | ---- | -------- | ------------------------------------------------------ |
| `ui` | ui   | 8080 | HTTP     | The web app and its API, behind the app's own password |

The app also makes outbound requests of its own: bitcoin prices, plus a hosted assistant provider and S3-compatible backup storage, but only if the user turns those on in the app.

## Installation and First-Run Flow

Nothing is generated at install. The app starts with no password, and the first person to open the **Web UI** sets it, so open it soon after installing.

## Actions

The package has two actions.

**Node Services** chooses which indexer the app is handed, and whether it gets Ollama.

- Run it to pin Fulcrum or Electrs instead of `auto`, to hand the app no indexer, or to stop using Ollama.
- It writes `store.json`. A changed choice restarts the service, which leaves the web interface down for a few seconds.
- It is safe to repeat.

**Reset Password** clears a forgotten password.

- It runs `/btctax reset-password` against `/data` in the temporary `reset-password` subcontainer. This clears the password hash and signs out every device. Records are kept.
- It takes a few seconds, and the service keeps running.
- It is safe to repeat. Until someone sets a new password, the next person to open the app chooses it.
- It has no output.

## Tasks

None. The service is never held on a prompt, and its ordinary controls are always available.

## Health Checks

There is one check, the `primary` daemon's ready check (**Web Interface**). It passes once the app is listening on port 8080.

The app is usually listening within seconds of starting. A check that stays failing means the app exited, so read the service logs. The usual causes are a database it can't open (a damaged or unwritable `/data`) or a startup error that the log names.

## Backups and Restore

Both volumes are copied wholesale (`ofVolumes`): the app's whole database, the kept import files, and `store.json`.

Nothing is excluded, and a restored service needs nothing rebuilt. It opens with the same records, settings and password, and looks up its dependencies again at start.

The app also has encrypted backups of its own: a file to download, and optional scheduled uploads to S3-compatible storage. These are separate from StartOS backups and are configured in the app.

## Limitations and Differences

1. The app runs as root inside its container, not as the image's own user.
2. Only plain TCP Electrum is taken from the node's indexer. A TLS Electrum server can still be set in the app's Settings.
3. Ollama models are pulled in Ollama, not in this package.
4. The "A folder" option of the app's Advanced backup has no network share to write to, because nothing is mounted for it. Its S3 option works.

---

## Quick Reference for AI Consumers

```yaml
package_id: proof-of-basis
image: ghcr.io/degrandis/proof-of-basis
architectures: [x86_64, aarch64]
subcontainers: [proof-of-basis-sub, reset-password]
volumes:
  main: /data
  startos: not mounted
file_models:
  - startos/store.json
startos_managed_env_vars:
  - BTCTAX_ELECTRUM_URL
  - BTCTAX_OLLAMA_URL
dependencies: [fulcrum (optional), electrs (optional), ollama (optional)]
interfaces:
  ui: { type: ui, port: 8080 }
actions:
  - node-services
  - reset-password
tasks: []
health_checks:
  - primary
```
