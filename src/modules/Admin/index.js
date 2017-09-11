/**
 * Internal dependencies
 */
import Container from './container'
import sagas from './redux/sagas'
import reducers from './redux/reducers'

Container.sagas = sagas
Container.reducers = reducers

export default Container
