/**
 * External dependencies
 */
import React from 'react'
import styled from 'styled-components'
import { Footer } from 'antd/lib/layout'

/**
 * Internal dependencies
 */
import config from '../../shared/config'

const AppDiv = styled.div`
  ${require('../../../node_modules/antd/dist/antd.css')}
`

const madeBy = config.twitter ? (
  <span> Made by <a href={`https://twitter.com/${config.twitter}`} target='_blank' rel='noopener noreferrer'>
    @{config.twitter} </a>. </span>
) : null

const attribution = config.attribution ? (
  <span> Using <a href='http://iwroteathing.today' target='_blank' rel='noopener noreferrer'>i wrote a thing
    today</a>. </span>
) : null

const App = ({ children }) => (
  <AppDiv>
    {children}

    <Footer> {madeBy} {attribution} </Footer>
  </AppDiv>
)

export default App
