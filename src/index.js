/**
 * External dependencies
 */
import registerServiceWorker from './registerServiceWorker'
import React from 'react'
import { render } from 'react-snapshot'

/**
 * Internal dependencies
 */
import Routes from './routes'

render((<Routes />), document.getElementById('root'))

registerServiceWorker()
