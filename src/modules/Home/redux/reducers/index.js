/**
 * Internal dependencies
 */
import { GET_POSTS } from '../action_types'

export default function posts (state = null, action = {}) {
  switch (action.type) {
    default: return state
    case GET_POSTS.SUCCESS: return action.payload
  }
}
