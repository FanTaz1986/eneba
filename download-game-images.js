const https = require('https');
const fs = require('fs');
const path = require('path');

// Game images mapping - using Steam CDN and other reliable sources
const games = [
  {
    name: 'FIFA 23',
    filename: 'fifa23.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1930816/header.jpg'
  },
  {
    name: 'Red Dead Redemption 2',
    filename: 'reddead2.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1174180/header.jpg'
  },
  {
    name: 'Split Fiction',
    filename: 'splitfiction.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1936450/header.jpg'
  },
  {
    name: 'The Legend of Zelda: Tears of the Kingdom',
    filename: 'zelda.jpg',
    // Using IGDB API fallback for Nintendo exclusive
    url: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6tg9.jpg'
  },
  {
    name: 'Elden Ring',
    filename: 'eldenring.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/570940/header.jpg'
  },
  {
    name: 'Cyberpunk 2077',
    filename: 'cyberpunk.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1091500/header.jpg'
  },
  {
    name: 'Starfield',
    filename: 'starfield.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1716740/header.jpg'
  },
  {
    name: 'Call of Duty: Modern Warfare II',
    filename: 'codmw2.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/2084220/header.jpg'
  },
  {
    name: 'Hogwarts Legacy',
    filename: 'hogwarts.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1869600/header.jpg'
  },
  {
    name: 'Baldurs Gate 3',
    filename: 'baldursgate3.jpg',
    url: 'https://steamcdn-a.akamaihd.net/steam/apps/1238140/header.jpg'
  }
];

const databaseDir = path.join(__dirname, 'database');

// Ensure database directory exists
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

// Download function
const downloadImage = (game) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(databaseDir, game.filename);
    const file = fs.createWriteStream(filePath);

    https.get(game.url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, (redirectResponse) => {
          redirectResponse.pipe(file);
        }).on('error', reject);
      } else {
        response.pipe(file);
      }

      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${game.name} → ${game.filename}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
};

// Download all images sequentially
async function downloadAllImages() {
  console.log('🎮 Starting game image downloads...\n');

  for (const game of games) {
    try {
      await downloadImage(game);
    } catch (error) {
      console.error(`❌ Failed to download ${game.name}:`, error.message);
    }
  }

  console.log('\n✨ Download complete!');
}

downloadAllImages();
