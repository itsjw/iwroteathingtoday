/**
 * Internal dependencies
 */
import { GET_POSTS } from '../action_types'
import { createReducer } from '../../../../shared/reducers'

const initialState = null

export default createReducer(initialState, (state, action) => {
  switch (action.type) {
    default: return state
    case GET_POSTS.SUCCESS: return action.payload
  }
})
