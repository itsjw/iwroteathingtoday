/**
 * External dependencies
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

/**
 * Internal dependencies
 */
import Component from './component'
import * as actions from './redux/actions'

const mapStateToProps = ({ posts }, ownProps) => ({ posts })
const mapDispatchToProps = (dispatch, ownProps) => ({...bindActionCreators(actions, dispatch)})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Component))
