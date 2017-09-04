/**
 * External dependencies
 */
import React from 'react'
import Row from 'antd/lib/grid/row'
import Spin from 'antd/lib/spin'
import styled from 'styled-components'

/**
 * Internal dependencies
 */
import ms from '../../../shared/styles/modular-scale'

const LoadingDiv = styled.div`
  padding: ${ms(4)} 0;

  p {
    margin-left: ${ms(1)};
  }
`

const Loading = () => (
  <LoadingDiv>
    <Row type='flex' justify='center' align='middle'>
      <Spin size='large' />
      <p> Give it a sec, k? </p>
    </Row>
  </LoadingDiv>
)

export default Loading
