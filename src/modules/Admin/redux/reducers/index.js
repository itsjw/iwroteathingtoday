/**
 * Internal dependencies
 */
import {
  ADMIN_DELETE_POST,
  ADMIN_SAVE_POST,
  ADMIN_SET_AUTH,
  ADMIN_GET_SETTINGS,
  ADMIN_ERROR_READ
} from '../action_types'

const storedContent = JSON.parse(window.localStorage.reducerAdmin || null)
const initialState = storedContent || { posts: null, error: null, auth: null }

export default function admin (state = initialState, action = {}) {
  let newState

  switch (action.type) {
    default: return state
    case ADMIN_SET_AUTH:
      newState = { ...state, error: null, auth: action.payload }
      break

    case ADMIN_DELETE_POST.SUCCESS:
    case ADMIN_SAVE_POST.SUCCESS:
    case ADMIN_GET_SETTINGS.SUCCESS:
      newState = { ...state, error: null, posts: action.payload }
      break

    case ADMIN_DELETE_POST.FAILED:
    case ADMIN_SAVE_POST.FAILED:
    case ADMIN_GET_SETTINGS.FAILED:
      newState = { ...state, error: action.message }
      break

    case ADMIN_ERROR_READ:
      newState = { ...state, error: null }
      break
  }

  window.localStorage.reducerAdmin = JSON.stringify(newState || state)

  return newState || state
}
