/**
 * External dependencies
 */
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'

/**
 * Internal dependencies
 */
import { GET_POSTS } from '../action_types'
import { getPosts } from './api'

function * fetchResult (action) {
  try {
    const payload = yield call(getPosts, action)
    yield put({ type: GET_POSTS.SUCCESS, payload })
  } catch (e) {
    yield put({ type: GET_POSTS.FAILED, message: e.message || e })
  }
}

/**
 * Export the root saga by forking all available sagas.
 */
export default function * rootSaga () {
  yield all([
    fork(function * () { yield takeLatest(GET_POSTS.ACTION, fetchResult) })
  ])
}
