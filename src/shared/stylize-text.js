/**
 * External dependencies
 */
import React from 'react'
import Markdown from 'markdown-it'
import twemoji from 'twemoji'

// Enable Markdown and a ridiculous amount of plugins
const md = new Markdown({ linkify: true, breaks: true, typographer: true })
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))

md.renderer.rules.emoji = function (token, index) {
  return twemoji.parse(token[index].content)
}

export default function stylize (text, Element) {
  if (!Element) return React.createElement('span', { dangerouslySetInnerHTML: { __html: md.render(text) } })

  return (<Element dangerouslySetInnerHTML={{ __html: md.render(text) }} />)
}
