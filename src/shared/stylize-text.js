// import React from 'react'

// const italic = /(_|\*).*?(\1)/g
// const bold = /(__|\*\*)(.*?)(\1)/g
// const scratch = /~~(.*)~~/g
// const image = /!\[(.*)\]\((.*)( {1}"(.*)")?\)/g
// const url = /\[(.*)\]\((.*)\)/g

// function replaceBold (text) {
  // if (text.match(bold)) {
    // return React.createElement(
      // 'string',
      // text.replace(/(__|\**)/g, '')
    // )
  // }

  // return text
// }

// function replaceItalic (text) {
  // return (<em>{text.replace(/(__|\*\*)/g, '')}</em>)
// }

export default function stylize (text) {
  // console.log('Italic', text.match(italic))
  // console.log('Bold', text.split(bold))
  // console.log('Bold', text.match(bold))

  // console.log('Scratch', text.match(scratch))
  // console.log('Image', text.match(image))
  // console.log('Url', text.match(url))

  return text
}
