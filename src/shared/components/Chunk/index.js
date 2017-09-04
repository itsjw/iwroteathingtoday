/**
 * External dependencies
 */
import React from 'react'
import PropTypes from 'prop-types'
import { all } from 'redux-saga/effects'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/observable/zip'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'

/**
 * Internal dependencies
 */
import Loading from '../Loading'
import { injectReducers } from '../../store/actions'

const moduleDefaultExport = module => module.default || module

function esModule (module, forceArray) {
  if (Array.isArray(module)) {
    return module.map(moduleDefaultExport)
  }

  const defaulted = moduleDefaultExport(module)
  return forceArray ? [defaulted] : defaulted
}

export default function asyncRoute (getComponent) {
  return class Chunk extends React.Component {
    static contextTypes = {
      store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired
      })
    }

    constructor () {
      super()

      this.Component = null

      this.state = { Component: null }
    }

    componentWillMount () {
      const { Component } = this.state

      if (!Component) {
        this._componentWillUnmountSubject = new Subject()

        const streams = [
          Component
            ? Observable.of(Component)
                .takeUntil(this._componentWillUnmountSubject)
            : Observable.fromPromise(getComponent())
                .map(esModule)
                .map(Component => {
                  if (Component.sagas) {
                    this.props.sagaMiddleware.run(function * () {
                      yield all([ Component.sagas() ])
                    })
                  }

                  if (Component.reducers) {
                    this.context.store.dispatch(injectReducers(
                      Array.isArray(Component.reducers) ? Component.reducers : [Component.reducers]
                    ))
                  }

                  Chunk.Component = Component
                  return Component
                })
                .takeUntil(this._componentWillUnmountSubject)
        ]

        Observable.zip(...streams)
          .takeUntil(this._componentWillUnmountSubject)
          .subscribe(([Component]) => {
            this.setState({ Component })
            this._componentWillUnmountSubject.unsubscribe()
          })
      }
    }

    componentDidMount () {
      this._mounted = true
    }

    componentWillUnmount () {
      if (this._componentWillUnmountSubject && !this._componentWillUnmountSubject.closed) {
        this._componentWillUnmountSubject.next()
        this._componentWillUnmountSubject.unsubscribe()
      }
    }

    render () {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : <Loading />
    }
  }
}
