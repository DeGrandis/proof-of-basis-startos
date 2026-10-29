import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.4:0',
  releaseNotes: {
    en_US:
      "Advanced backup: send an encrypted backup of your records to S3-compatible storage (such as Backblaze B2 or a self-hosted Garage) on a schedule. It uploads only when your data has changed. The app's version now has its own line at the bottom of each page.",
    es_ES:
      'Copia de seguridad avanzada: envía una copia cifrada de tus registros a un almacenamiento compatible con S3 (como Backblaze B2 o un Garage propio) de forma programada. Solo la sube cuando tus datos han cambiado. La versión de la app ahora aparece en su propia línea al pie de cada página.',
    de_DE:
      'Erweiterte Sicherung: Senden Sie nach Zeitplan eine verschlüsselte Sicherung Ihrer Daten an S3-kompatiblen Speicher (etwa Backblaze B2 oder ein selbst betriebenes Garage). Hochgeladen wird nur, wenn sich Ihre Daten geändert haben. Die Version der App steht jetzt in einer eigenen Zeile am Ende jeder Seite.',
    pl_PL:
      'Zaawansowana kopia zapasowa: wysyłaj według harmonogramu zaszyfrowaną kopię swoich danych do magazynu zgodnego z S3 (np. Backblaze B2 lub własnego Garage). Kopia jest przesyłana tylko wtedy, gdy Twoje dane się zmieniły. Wersja aplikacji jest teraz w osobnej linii na dole każdej strony.',
    fr_FR:
      "Sauvegarde avancée : envoyez selon un calendrier une sauvegarde chiffrée de vos données vers un stockage compatible S3 (comme Backblaze B2 ou un Garage auto-hébergé). Elle n'est envoyée que si vos données ont changé. La version de l'application figure désormais sur sa propre ligne en bas de chaque page.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
