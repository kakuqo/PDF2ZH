import { calculateFileHash } from './index';
import fs from 'fs';
import path from 'path';

async function main() {
  const macPath = path.join(__dirname, '../output/PDF2ZH@2.0.4-mac.pemox');
  const winPath = path.join(__dirname, '../output/PDF2ZH@2.0.4-win.pemox');
  const fileInfoPath = path.join(__dirname, '../output/fileInfo.json');

  const [macHash, winHash] = await Promise.all([
    calculateFileHash(macPath),
    calculateFileHash(winPath)
  ]);

  const fileInfo = JSON.parse(fs.readFileSync(fileInfoPath, 'utf8'));
  fileInfo.macFileHash = macHash;
  fileInfo.winFileHash = winHash;
  fs.writeFileSync(fileInfoPath, JSON.stringify(fileInfo, null, 2));

  console.log('已更新 fileInfo.json');
  console.log('macFileHash:', macHash);
  console.log('winFileHash:', winHash);
}

main().catch(err => {
  console.error('更新hash出错:', err);
}); 