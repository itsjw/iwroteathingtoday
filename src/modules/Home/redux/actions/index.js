/**
 * External dependencies
 */
import { dispatch } from 'adnoto'

/**
 * Internal dependencies
 */
import { GET_POSTS } from '../action_types'

export const getPosts = () => dispatch({ type: GET_POSTS.ACTION })
