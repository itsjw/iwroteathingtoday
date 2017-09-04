/**
 * External dependencies
 */
import styled from 'styled-components'

/**
 * Internal dependencies
 */
import ms from '../styles/modular-scale'

export default styled.article`
  padding: ${ms(2)} ${ms(1)};

  hr {
    border: 1px solid lightgrey;
    margin: ${ms(0)} 0;
  }

  p {
    font-size: ${ms(1)};
    line-height: ${ms(1)};
    text-align: justify;
  }
`
