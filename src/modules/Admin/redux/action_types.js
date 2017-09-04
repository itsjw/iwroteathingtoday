/**
 * Internal dependencies
 */
import { createSagaAction } from '../../../shared/sagas'

/**
 * Action types
 *
 * Pro Tip: Make sure to always start with the module name to avoid collision.
 */
export const ADMIN_GET_SETTINGS = createSagaAction('ADMIN_GET_SETTINGS')
export const ADMIN_SET_AUTH = 'ADMIN_SET_AUTH'
export const ADMIN_SAVE_POST = createSagaAction('ADMIN_SAVE_POST')
export const ADMIN_DELETE_POST = createSagaAction('ADMIN_DELETE_POST')
export const ADMIN_ERROR_READ = 'ADMIN_ERROR_READ'
