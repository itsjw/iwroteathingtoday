/**
 * External dependencies
 */
import React from 'react'
import styled from 'styled-components'
import { Footer } from 'antd/lib/layout'

const AppDiv = styled.div`
  ${require('../../../node_modules/antd/dist/antd.css')}
`

const App = ({ children }) => (
  <AppDiv>
    {children}

    <Footer>
      Made by <a href='https://twitter.com/bcallaars' target='_blank' rel='noopener noreferrer'> @bcallaars </a>,
      with <a href='https://iwroteathing.today' target='_blank' rel='noopener noreferrer'> I Wrote A Thing Today! </a>.
    </Footer>
  </AppDiv>
)

export default App
