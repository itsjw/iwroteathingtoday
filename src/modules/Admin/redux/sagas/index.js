/**
 * External dependencies
 */
import { dispatch } from 'adnoto'

/**
 * Internal dependencies
 */
import { ADMIN_DELETE_POST, ADMIN_SAVE_POST, ADMIN_GET_SETTINGS } from '../action_types'
import * as Api from './api'

function fetchResult ({ func, type, action }) {
  func(action)
    .then(payload => {
      dispatch({ type: type.SUCCESS, payload })
    })
    .catch(e => {
      dispatch({ type: type.FAILED, message: e.message || e })
    })
}

/**
 * Export the root saga by forking all available sagas.
 */
export default [
  action => {
    if (action.type === ADMIN_GET_SETTINGS.ACTION) {
      fetchResult({ action, type: ADMIN_GET_SETTINGS, func: Api.getSettings })
    }
  },

  action => {
    if (action.type === ADMIN_SAVE_POST.ACTION) {
      fetchResult({ action, type: ADMIN_SAVE_POST, func: Api.savePost })
    }
  },

  action => {
    if (action.type === ADMIN_DELETE_POST.ACTION) {
      fetchResult({ action, type: ADMIN_DELETE_POST, func: Api.deletePost })
    }
  }
]
