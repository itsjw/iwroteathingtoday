/**
 * External dependencies
 */
import { all, fork, call, put, takeLatest } from 'redux-saga/effects'

/**
 * Internal dependencies
 */
import { ADMIN_DELETE_POST, ADMIN_SAVE_POST, ADMIN_GET_SETTINGS } from '../action_types'
import * as Api from './api'

function fetchResult (func, type) {
  return function * callFetchResult (action) {
    try {
      const payload = yield call(func, action)
      yield put({ type: type.SUCCESS, payload })
    } catch (e) {
      yield put({ type: type.FAILED, message: e.message || e })
    }
  }
}

/**
 * Export the root saga by forking all available sagas.
 */
export default function * rootSaga () {
  yield all([
    fork(function * () { yield takeLatest(ADMIN_GET_SETTINGS.ACTION, fetchResult(Api.getSettings, ADMIN_GET_SETTINGS)) }),
    fork(function * () { yield takeLatest(ADMIN_SAVE_POST.ACTION, fetchResult(Api.savePost, ADMIN_SAVE_POST)) }),
    fork(function * () { yield takeLatest(ADMIN_DELETE_POST.ACTION, fetchResult(Api.deletePost, ADMIN_DELETE_POST)) })
  ])
}
