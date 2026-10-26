import { sdk } from '../sdk'
import { nodeServices } from './nodeServices'
import { resetPassword } from './resetPassword'

export const actions = sdk.Actions.of()
  .addAction(nodeServices)
  .addAction(resetPassword)
