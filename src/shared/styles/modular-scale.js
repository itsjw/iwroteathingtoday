/**
 * External dependencies
 */
import modularScale from 'modular-scale'

const ratios = [1.667]
const bases = [1]
const ms = modularScale({ ratios, bases })

export default size => ms(size) + 'em'
