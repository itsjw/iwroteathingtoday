/**
 * Internal dependencies
 */
import Container from './container'
import sagas from './redux/sagas'
import reducers from './redux/reducers'

Container.sagas = sagas
Container.reducers = { admin: reducers }

export default Container
