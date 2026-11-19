// One Day, Drawn — an entry for make.fun's "Sum up 18 November's world news in one image" bounty.
//
// The repository holds the finished front page as entry.png; this program writes it to
// /output/entry.png so the judge sees exactly these bytes. Node 22, standard library only,
// no network, no clock, no randomness: two runs write the same file.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const image = new URL('./entry.png', import.meta.url);

const bytes = readFileSync(image);
if (!(bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47)) {
  throw new Error('entry.png does not start with the PNG magic bytes');
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1048576-byte cap`);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
copyFileSync(image, dest);
console.log(`entry: wrote ${bytes.length} bytes to ${dest}`);
