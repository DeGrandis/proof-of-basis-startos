# Updating the upstream version

Upstream is the Proof of Basis release image, `ghcr.io/degrandis/proof-of-basis`. Each `vX.Y.Z` tag in the app's repository publishes `:X.Y.Z` for amd64 and arm64.

## Determining the upstream version

The latest release is the highest `v*` tag:

```
git ls-remote --tags --sort=-v:refname https://github.com/DeGrandis/proof-of-basis 'v*' | head -1
```

The current pin is `images['proof-of-basis'].source.dockerTag` in `startos/manifest/index.ts`.

## Applying the bump

1. Wait for the release's image build to finish, then read the multi-arch index digest (the `Digest:` line at the top, not a per-platform one):

   ```
   docker buildx imagetools inspect ghcr.io/degrandis/proof-of-basis:X.Y.Z
   ```

2. Set `dockerTag` to `ghcr.io/degrandis/proof-of-basis:X.Y.Z@sha256:<digest>`. The image tag has no leading `v`. Update the comment above it.
3. In `startos/versions/current.ts`, set `version` to `X.Y.Z:0` and write the release notes in all five locales.
