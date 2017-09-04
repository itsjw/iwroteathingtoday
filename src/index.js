/**
 * External dependencies
 */
import registerServiceWorker from './registerServiceWorker'
import React from 'react'
import { render } from 'react-snapshot'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerReducer } from 'react-router-redux'
import throttle from 'lodash/throttle'

/**
 * Internal dependencies
 */
import Routes, { rootSaga, reducers } from './routes'
import Registry from './shared/store/registry'
import registryMiddleware from './shared/store/middleware'

const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = ({ routing }) => {
  try {
    window.localStorage.setItem('state', JSON.stringify({ routing }))
  } catch (err) {
    return undefined
  }
}

// Initialize the Redux set up
const registry = new Registry({ ...reducers, routing: routerReducer })
const finalCreateStore = applyMiddleware(registryMiddleware(registry))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = finalCreateStore(createStore)(
  registry.initialReducers,
  loadState(),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

registry.store = store

store.subscribe(throttle(() => { saveState(store.getState()) }, 1000))

// Run the saga now
sagaMiddleware.run(rootSaga)

render((
  <Provider store={store}>
    <Routes sagaMiddleware={sagaMiddleware} />
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
