import sharp from 'sharp';

const img = await sharp('/home/user/Coding/admin-helper/.qwen/tmp/mobile-top-render.png');
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
console.log('size', width, 'x', height, 'channels', channels);

const px = (x, y) => {
  const i = (y * width + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
};

// classify helpers
const isTealBg = (r, g, b) => r < 90 && g > 80 && g < 150 && b > 80 && b < 150 && g >= r + 30 && b >= r + 30;
const isOrange = (r, g, b) => r > 150 && g > 60 && g < 210 && b < 130 && r >= b + 60;
// light teal border of button: R notably lower than G/B, all fairly high
const isLightTeal = (r, g, b) => r > 160 && g > 190 && b > 190 && g >= r + 10 && b >= r + 5;
const isWhite = (r, g, b) => r > 200 && g > 200 && b > 200;

// Find topbar extent: rows where teal bg is dominant
let topbarTop = -1, topbarBottom = -1;
for (let y = 0; y < height; y++) {
  let teal = 0, total = 0;
  for (let x = 0; x < width; x += 4) {
    const [r, g, b] = px(x, y);
    total++;
    if (isTealBg(r, g, b)) teal++;
  }
  const ratio = teal / total;
  if (ratio > 0.5) {
    if (topbarTop < 0) topbarTop = y;
    topbarBottom = y;
  }
}
console.log('topbar rows', topbarTop, topbarBottom);

// Orange bbox (logo + .helper accent)
let oMinX = Infinity, oMaxX = -1, oMinY = Infinity, oMaxY = -1;
for (let y = topbarTop; y <= topbarBottom; y++) {
  for (let x = 0; x < width; x++) {
    const [r, g, b] = px(x, y);
    if (isOrange(r, g, b)) {
      if (x < oMinX) oMinX = x;
      if (x > oMaxX) oMaxX = x;
      if (y < oMinY) oMinY = y;
      if (y > oMaxY) oMaxY = y;
    }
  }
}
console.log('orange bbox', { oMinX, oMaxX, oMinY, oMaxY }, 'centerY', (oMinY + oMaxY) / 2);

// Light-teal (button border) bbox in the RIGHT half
let bMinX = Infinity, bMaxX = -1, bMinY = Infinity, bMaxY = -1;
for (let y = topbarTop; y <= topbarBottom; y++) {
  for (let x = Math.floor(width / 2); x < width; x++) {
    const [r, g, b] = px(x, y);
    if (isLightTeal(r, g, b)) {
      if (x < bMinX) bMinX = x;
      if (x > bMaxX) bMaxX = x;
      if (y < bMinY) bMinY = y;
      if (y > bMaxY) bMaxY = y;
    }
  }
}
console.log('button border bbox', { bMinX, bMaxX, bMinY, bMaxY }, 'centerY', (bMinY + bMaxY) / 2);

// White text bbox in right half (Меню)
let wMinX = Infinity, wMaxX = -1, wMinY = Infinity, wMaxY = -1;
for (let y = topbarTop; y <= topbarBottom; y++) {
  for (let x = Math.floor(width / 2); x < width; x++) {
    const [r, g, b] = px(x, y);
    if (isWhite(r, g, b)) {
      if (x < wMinX) wMinX = x;
      if (x > wMaxX) wMaxX = x;
      if (y < wMinY) wMinY = y;
      if (y > wMaxY) wMaxY = y;
    }
  }
}
console.log('right white text bbox', { wMinX, wMaxX, wMinY, wMaxY }, 'centerY', (wMinY + wMaxY) / 2);

// ASCII map of topbar (downsample)
const mapW = 90;
const mapH = 24;
console.log('\nASCII map (T=teal bg, O=orange, L=light-teal border, W=white, .=other):');
for (let my = 0; my < mapH; my++) {
  const y0 = Math.floor(topbarTop + (topbarBottom - topbarTop + 1) * my / mapH);
  let line = '';
  for (let mx = 0; mx < mapW; mx++) {
    const x0 = Math.floor(width * mx / mapW);
    // sample a small block
    let t = 0, o = 0, l = 0, w = 0, n = 0;
    const bw = Math.ceil(width / mapW);
    const bh = Math.ceil((topbarBottom - topbarTop + 1) / mapH);
    for (let yy = y0; yy < y0 + bh && yy <= topbarBottom; yy++) {
      for (let xx = x0; xx < x0 + bw && xx < width; xx++) {
        const [r, g, b] = px(xx, yy);
        n++;
        if (isTealBg(r, g, b)) t++;
        else if (isOrange(r, g, b)) o++;
        else if (isLightTeal(r, g, b)) l++;
        else if (isWhite(r, g, b)) w++;
      }
    }
    const max = Math.max(t, o, l, w);
    if (max === 0) line += '.';
    else if (max === t) line += 'T';
    else if (max === o) line += 'O';
    else if (max === l) line += 'L';
    else line += 'W';
  }
  console.log(line);
}
