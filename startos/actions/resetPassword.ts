import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { dataMounts, runAs } from '../utils'

export const resetPassword = sdk.Action.withoutInput(
  'reset-password',

  {
    name: i18n('Reset Password'),
    description: i18n(
      'Clear the Proof of Basis password if you have forgotten it. Your records are kept.',
    ),
    warning: i18n(
      'Signs out every device. The next person to open Proof of Basis chooses the new password, so open it right away.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },

  async ({ effects }) => {
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'proof-of-basis' },
      dataMounts,
      'reset-password',
      (sub) => sub.execFail(['/btctax', 'reset-password'], { user: runAs }),
    )

    return {
      version: '1',
      title: i18n('Password Cleared'),
      message: i18n(
        'Open Proof of Basis to choose a new password. Your records are unchanged.',
      ),
      result: null,
    }
  },
)
