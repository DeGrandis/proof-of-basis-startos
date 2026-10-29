import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.1.3:0',
  releaseNotes: {
    en_US:
      'Cash App imports. The assistant can use a hosted provider such as OpenRouter (off unless you choose it, after confirming the provider will see your data), and is more reliable with small local models. Imported files are kept so you can download them again. The app is available in Spanish, French, German, Polish and Russian.',
    es_ES:
      'Importa exportaciones de Cash App. El asistente puede usar un proveedor en la nube como OpenRouter (desactivado salvo que lo elijas, tras confirmar que el proveedor verá tus datos) y es más fiable con modelos locales pequeños. Los archivos importados se guardan para que puedas descargarlos de nuevo. La app está disponible en español, francés, alemán, polaco y ruso.',
    de_DE:
      'Import von Cash-App-Exporten. Der Assistent kann einen gehosteten Anbieter wie OpenRouter nutzen (aus, solange Sie ihn nicht wählen und bestätigen, dass der Anbieter Ihre Daten sieht) und arbeitet mit kleinen lokalen Modellen zuverlässiger. Importierte Dateien werden aufbewahrt, sodass Sie sie erneut herunterladen können. Die App gibt es auf Spanisch, Französisch, Deutsch, Polnisch und Russisch.',
    pl_PL:
      'Import eksportów z Cash App. Asystent może korzystać z dostawcy w chmurze, takiego jak OpenRouter (wyłączone, dopóki go nie wybierzesz i nie potwierdzisz, że dostawca zobaczy Twoje dane), i działa pewniej z małymi modelami lokalnymi. Importowane pliki są zachowywane, więc możesz je ponownie pobrać. Aplikacja jest dostępna po hiszpańsku, francusku, niemiecku, polsku i rosyjsku.',
    fr_FR:
      "Import des exports Cash App. L'assistant peut utiliser un fournisseur hébergé comme OpenRouter (désactivé sauf si vous le choisissez, après avoir confirmé que le fournisseur verra vos données) et est plus fiable avec les petits modèles locaux. Les fichiers importés sont conservés pour que vous puissiez les télécharger à nouveau. L'application est disponible en espagnol, français, allemand, polonais et russe.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
