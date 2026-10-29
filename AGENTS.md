# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

- Build on Linux (or WSL) with `npm ci`, then `make`. `npm install` rewrites the lockfile, and the build is then marked `-modified`. `.gitattributes` forces LF for the same reason: a CRLF checkout counts as modified.
- Keep `runAs` at `0:0`. Existing installs' data in `main` is owned by root, so running as the image's user (65532) needs an idmap on the mount first.
