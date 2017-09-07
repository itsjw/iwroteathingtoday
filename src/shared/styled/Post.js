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
  font-size: ${ms(1)};

  hr {
    border: 1px solid lightgrey;
    margin: ${ms(0)} 0;
  }

  p {
    line-height: ${ms(1)};
    text-align: justify;
  }

  img {
    max-width: 100%;
  }

  .emoji {
    height: 18px;
    margin: 0 1px;
  }

  ul, ol {
    list-style-type: disc;
    margin-left: 20px;
  }
`
