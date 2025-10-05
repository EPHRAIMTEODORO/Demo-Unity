const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buildDir = path.join(__dirname, '..', 'Build');
const files = fs.readdirSync(buildDir);

files.filter(f => f.endsWith('.br')).forEach(f => {
  const inputPath = path.join(buildDir, f);
  const outputName = f.replace(/\.br$/, '');
  const outputPath = path.join(buildDir, outputName);

  const inp = fs.createReadStream(inputPath);
  const out = fs.createWriteStream(outputPath);
  const brotli = zlib.createBrotliDecompress();

  inp.pipe(brotli).pipe(out).on('finish', () => {
    console.log('Decompressed', f, '->', outputName);
  }).on('error', (err) => {
    console.error('Error decompressing', f, err);
  });
});
