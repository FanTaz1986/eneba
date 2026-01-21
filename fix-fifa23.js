const https = require('https');
const fs = require('fs');
const path = require('path');

// Alternative image URLs
const alternativeSources = {
  'fifa23.jpg': [
    'https://cdn1.epicgames.com/offer/923d10cc651a429fdb20786aaad60d05/EGS_EA_SPORTS_FC_24_S1_1200x1600-f4da27a6a5e3472dfc7ad87a1d99a0b8_1200x1600-f4da27a6a5e3472dfc7ad87a1d99a0b8.jpg',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v1a.jpg'
  ]
};

const downloadImage = (url, filePath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        const redirectUrl = response.headers.location;
        downloadImage(redirectUrl, filePath).then(resolve).catch(reject);
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filePath);
        console.log(`✅ Downloaded FIFA 23: ${(stats.size / 1024).toFixed(2)} KB`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
};

async function retryDownload() {
  const filePath = path.join(__dirname, 'database', 'fifa23.jpg');
  const sources = alternativeSources['fifa23.jpg'];

  for (const url of sources) {
    try {
      console.log(`Trying: ${url}`);
      await downloadImage(url, filePath);
      return;
    } catch (error) {
      console.log(`Failed, trying next source...`);
    }
  }

  console.error('All sources failed for FIFA 23');
}

retryDownload();
