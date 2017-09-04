/**
 * Internal dependencies
 */
import { createSagaAction } from '../../../shared/sagas'

/**
 * Action types
 *
 * Pro Tip: Make sure to always start with the module name to avoid collision.
 */
export const GET_POSTS = createSagaAction('GET_POSTS')
