/**
 * External dependencies
 */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LocaleProvider, { enUS } from 'antd/lib/locale-provider'

/**
 * Internal dependencies
 */
import asyncRoute from './shared/components/Chunk'
import App from './modules/App'

const Home = asyncRoute(() => import('./modules/Home' /* webpackChunkName: "home" */))
const Admin = asyncRoute(() => import('./modules/Admin' /* webpackChunkName: "admin" */))

/**
 * Define child routes here, App is mandatory.
 */
export default ({ sagaMiddleware }) => (
  <Router>
    <LocaleProvider locale={enUS}>
      <App>
        <Route exact path='/' component={props => <Home {...props} />} />
        <Route exact path='/admin' component={props => <Admin {...props} />} />
      </App>
    </LocaleProvider>
  </Router>
)
