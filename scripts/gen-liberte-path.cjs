/**
 * Generates SVG path data for "liberté." in Fraunces 300 italic.
 *
 * Note: opentype.js has a precision bug where certain floating-point x positions
 * produce NaN coordinates. Rounding to 2 decimal places avoids it.
 */
const fs = require('fs')
const path = require('path')
const ot = require('opentype.js')

const fontPath = path.resolve(
  __dirname,
  '../node_modules/@fontsource/fraunces/files/fraunces-latin-300-italic.woff'
)

const buf = fs.readFileSync(fontPath)
const font = ot.parse(buf.buffer)

const text = 'liberté.'
const fontSize = 200
const baseline = fontSize * 0.82   // visual baseline for display type
const scale = fontSize / font.unitsPerEm

// Build combined path, glyph by glyph with kerning, rounding x to avoid opentype.js NaN bug
let xPos = 0
let prevGlyphIdx = -1
const svgPaths = []

for (let i = 0; i < text.length; i++) {
  const char = text[i]
  const glyphIdx = font.charToGlyphIndex(char)
  const glyph = font.glyphs.get(glyphIdx)

  if (prevGlyphIdx >= 0) {
    const kern = font.getKerningValue(prevGlyphIdx, glyphIdx)
    xPos += kern * scale
  }

  // Round to 2dp to prevent opentype.js floating-point NaN bug
  const xRounded = Math.round(xPos * 100) / 100
  const p = glyph.getPath(xRounded, baseline, fontSize)
  const svg = p.toSVG(2)

  if (svg.includes('NaN')) {
    console.warn(`⚠ NaN in glyph "${char}" at x=${xPos} (rounded ${xRounded})`)
  } else {
    // Strip <path …/> wrapper, keep only d="…" value, add to combined
    const match = svg.match(/d="([^"]+)"/)
    if (match) svgPaths.push(match[1])
  }

  xPos += glyph.advanceWidth * scale
  prevGlyphIdx = glyphIdx
}

// Bounding box: render a single combined path to measure
const combinedD = svgPaths.join(' ')

// Rough bbox: just use fontSize-based estimates, then we'll refine
const padding = 20
const approxW = Math.ceil(xPos) + padding * 2
const approxH = Math.ceil(fontSize * 1.1) + padding * 2
const vbX = -padding
const vbY = -Math.ceil(fontSize * 0.22) - padding   // cap height roughly
const vbW = approxW
const vbH = approxH

console.log('\n=== SVG Path for "liberté." ===')
console.log(`viewBox="${vbX} ${vbY} ${vbW} ${vbH}"`)
console.log(`width="${vbW}" height="${vbH}"`)
console.log('\nCombined path d attribute length:', combinedD.length)
console.log('Has NaN:', combinedD.includes('NaN'))

const output = {
  text,
  fontSize,
  viewBox: `${vbX} ${vbY} ${vbW} ${vbH}`,
  width: vbW,
  height: vbH,
  pathD: combinedD
}

const outDir = path.resolve(__dirname, '../src/data')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'liberte-path.json')
fs.writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`\nWritten to: src/data/liberte-path.json`)
