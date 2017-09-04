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

export const getPosts = data => ({ type: ADMIN_GET_SETTINGS.ACTION, data })
export const setAuth = payload => ({ type: ADMIN_SET_AUTH, payload })
export const savePost = data => ({ type: ADMIN_SAVE_POST.ACTION, data })
export const deletePost = data => ({ type: ADMIN_DELETE_POST.ACTION, data })
export const readError = () => ({ type: ADMIN_ERROR_READ })
