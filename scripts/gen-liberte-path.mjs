/**
 * Generates SVG path data for "liberté." in Fraunces 300 italic
 * Output: prints the <path d="..."> string and viewBox to paste into FlagInterstitial.astro
 */

import * as opentypeModule from 'opentype.js'
const opentype = opentypeModule.default || opentypeModule
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fontPath = path.resolve(
  __dirname,
  '../node_modules/@fontsource/fraunces/files/fraunces-latin-300-italic.woff'
)

const font = opentype.loadSync(fontPath)

const text = 'liberté.'
const fontSize = 200  // large enough for smooth curves
const x = 0
const y = fontSize * 0.8  // baseline offset (roughly 80% of font-size)

const pathData = font.getPath(text, x, y, fontSize)
const svgPath = pathData.toSVG(2)  // 2 decimal places

// Get bounding box
const bb = pathData.getBoundingBox()
const padding = 10
const vbX = Math.floor(bb.x1 - padding)
const vbY = Math.floor(bb.y1 - padding)
const vbW = Math.ceil(bb.x2 - bb.x1 + padding * 2)
const vbH = Math.ceil(bb.y2 - bb.y1 + padding * 2)

console.log('\n=== SVG Path for "liberté." ===\n')
console.log(`viewBox="${vbX} ${vbY} ${vbW} ${vbH}"`)
console.log(`width="${vbW}" height="${vbH}"`)
console.log('\nPath element:')
console.log(svgPath)

// Also write to a JSON file for easy inclusion
const output = {
  text,
  fontSize,
  viewBox: `${vbX} ${vbY} ${vbW} ${vbH}`,
  width: vbW,
  height: vbH,
  pathD: svgPath.match(/d="([^"]+)"/)?.[1] || ''
}

const outPath = path.resolve(__dirname, '../src/data/liberte-path.json')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`\nWritten to: src/data/liberte-path.json`)
