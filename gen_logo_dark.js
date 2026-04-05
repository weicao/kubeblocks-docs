const sharp = require('sharp');

const src = '/Users/wei/ApeCloud/kubeblocks-docs/public/logo.png';
const dst = '/Users/wei/ApeCloud/kubeblocks-docs/public/logo-dark.png';

const SCALE = 20;
const THICKNESS = 16;

async function main() {
  const { data: origData, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  console.log(`Original: ${width}x${height}, channels=${channels}`);

  const buf = Buffer.from(origData);

  // Identify color block pixels
  const colorBlock = new Uint8Array(width * height);
  for (let i = 0; i < buf.length; i += channels) {
    const r = buf[i], g = buf[i+1], b = buf[i+2], a = channels === 4 ? buf[i+3] : 255;
    if (a < 10) continue;
    const isNearBlack = r < 80 && g < 80 && b < 80;
    const isWhite = r > 230 && g > 230 && b > 230;
    if (!isNearBlack && !isWhite) {
      colorBlock[Math.floor(i / channels)] = 1;
    }
  }

  // Convert pixels: near-black → #444444, white → transparent
  for (let i = 0; i < buf.length; i += channels) {
    const r = buf[i], g = buf[i+1], b = buf[i+2], a = channels === 4 ? buf[i+3] : 255;
    if (a < 10) { if (channels === 4) buf[i+3] = 0; continue; }
    const isNearBlack = r < 80 && g < 80 && b < 80;
    const isWhite = r > 230 && g > 230 && b > 230;
    if (isNearBlack) {
      buf[i] = 0x00; buf[i+1] = 0x00; buf[i+2] = 0x00;
      if (channels === 4) buf[i+3] = 255;
    } else if (isWhite) {
      if (channels === 4) buf[i+3] = 0;
    }
  }

  // Downsample to small scale: 0=transparent, 1=text, 2=color block
  const sw = Math.floor(width / SCALE);
  const sh = Math.floor(height / SCALE);
  const smallType = new Uint8Array(sw * sh);

  for (let sy = 0; sy < sh; sy++) {
    for (let sx = 0; sx < sw; sx++) {
      const fx = sx * SCALE + Math.floor(SCALE / 2);
      const fy = sy * SCALE + Math.floor(SCALE / 2);
      const fi = (fy * width + fx) * channels;
      const a = channels === 4 ? buf[fi + 3] : 255;
      const si = sy * sw + sx;
      if (a < 10) { smallType[si] = 0; }
      else if (colorBlock[fy * width + fx]) { smallType[si] = 2; }
      else { smallType[si] = 1; }
    }
  }

  // Dilate ALL text pixels into adjacent transparent areas
  const whiteMask = new Uint8Array(sw * sh);

  for (let sy = 0; sy < sh; sy++) {
    for (let sx = 0; sx < sw; sx++) {
      if (smallType[sy * sw + sx] !== 1) continue; // only text pixels
      for (let dy = -THICKNESS; dy <= THICKNESS; dy++) {
        for (let dx = -THICKNESS; dx <= THICKNESS; dx++) {
          
          const nx = sx + dx, ny = sy + dy;
          if (dx * dx + dy * dy > THICKNESS * THICKNESS) continue;
          if (nx < 0 || nx >= sw || ny < 0 || ny >= sh) continue;
          const ni = ny * sw + nx;
          if (smallType[ni] === 0) { // transparent only
            whiteMask[ni] = 1;
          }
        }
      }
    }
  }

  // Upscale white mask and apply to full res
  let compositeCount = 0;
  for (let sy = 0; sy < sh; sy++) {
    for (let sx = 0; sx < sw; sx++) {
      if (!whiteMask[sy * sw + sx]) continue;
      for (let dy = 0; dy < SCALE; dy++) {
        for (let dx = 0; dx < SCALE; dx++) {
          const fx = sx * SCALE + dx;
          const fy = sy * SCALE + dy;
          if (fx >= width || fy >= height) continue;
          const fi = (fy * width + fx) * channels;
          buf[fi] = 255; buf[fi + 1] = 255; buf[fi + 2] = 255;
          if (channels === 4) buf[fi + 3] = 255;
        }
      }
      compositeCount++;
    }
  }
  console.log(`White mask pixels: ${compositeCount}`);

  await sharp(buf, { raw: { width, height, channels } }).png().toFile(dst);
  console.log('Done:', dst);
}

main().catch(console.error);
