/**
 * External dependencies
 */
import { combineReducers } from 'redux'

class Registry {
  constructor (baseReducers) {
    this.reducers = baseReducers
    this.store = null
  }

  injectReducers (reducers) {
    this.reducers = Object.assign(
      {},
      this.reducers,
      reducers.reduce((result, reducer) => {
        result[reducer.reducer] = reducer
        return result
      }),
    )

    this.store.replaceReducer(combineReducers(this.reducers))
  }

  get initialReducers () {
    return combineReducers(this.reducers)
  }
}

export default Registry
