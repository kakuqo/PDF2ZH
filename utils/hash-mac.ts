const { calculateFileHash } = require('./index.ts');

const filePath = '../output/PDF2ZH@2.0.5-mac.pemox';

calculateFileHash(filePath)
  .then(hash => {
    console.log('mac包 hash:', hash);
  })
  .catch(err => {
    console.error('计算hash出错:', err);
  }); 