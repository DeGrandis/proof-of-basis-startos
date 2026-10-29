# Proof of Basis

Proof of Basis keeps your bitcoin cost basis and tax records on this server. You add your exchange exports and your wallets, and it works out the basis of every coin and your gains for each year.

## Documentation

- [Proof of Basis on GitHub](https://github.com/DeGrandis/proof-of-basis) explains how it works and what each import expects.

## Getting set up

1. Start **Proof of Basis**, then open the **Web UI** interface.
2. Choose a password. This is the password for Proof of Basis itself; the first person to open it sets it.
3. Import your exchange exports (Cash App, Coinbase, Fold, River, Strike, or a spreadsheet of your own), and add your wallets.

## Node services

Proof of Basis uses other services on this server when they are installed, with nothing to configure:

- **Fulcrum** or **Electrs** looks up your wallets on your own node. With both installed it uses Fulcrum. Without either, you can still use exchange files, or set an Electrum server in the app's Settings.
- **Ollama** runs the optional assistant that answers questions about your records. Pull a model in Ollama first, then choose it in the app's Settings.

Settings shows **Found on your node** beside each one it picked up. A server you enter in Settings yourself always takes precedence.

To choose a different indexer, or to stop using Ollama, run the **Node Services** action.

## Forgotten password

Run the **Reset Password** action. It clears the password and signs out every device; your records are kept. Open Proof of Basis right away and choose a new one.

## Backups

StartOS backups include all of your Proof of Basis records and settings.

## Limitations

- Proof of Basis organizes your own records. It is not tax, legal or financial advice, and it doesn't file anything for you.
