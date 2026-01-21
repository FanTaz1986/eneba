const express = require('express');
const cors = require('cors');
const path = require('path');

console.log('📦 Loading database connection...');
let db;
try {
  db = require('../database/connection');
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
  console.log('✅ Database OK - found', count.count, 'products');
} catch (err) {
  console.error('❌ Database error:', err.message);
  process.exit(1);
}

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
// Serve images from database folder
app.use('/database', express.static(path.join(__dirname, '../database')));

// Fuzzy search function
const levenshteinDistance = (str1, str2) => {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null)
  );
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
};

const fuzzySearch = (products, query) => {
  const normalized = query.toLowerCase();
  const results = products.map((product) => {
    const nameDistance = levenshteinDistance(product.name.toLowerCase(), normalized);
    const descDistance = levenshteinDistance((product.description || '').toLowerCase(), normalized);
    const minDistance = Math.min(nameDistance, descDistance);
    const similarity = 1 / (1 + minDistance * 0.1);
    return { product, similarity };
  });
  
  return results
    .filter(r => r.similarity > 0.3)
    .sort((a, b) => b.similarity - a.similarity)
    .map(r => r.product);
};

// Routes
app.get('/api/list', (req, res) => {
  try {
    console.log('📝 GET /api/list');
    const { search } = req.query;
    let allProducts = db.prepare('SELECT * FROM products').all();
    // Map image_url to image for frontend compatibility
    allProducts = allProducts.map(p => ({ ...p, image: p.image_url }));
    console.log('✅ Found', allProducts.length, 'products');
    
    if (search) {
      console.log('🔍 Searching for:', search);
      const results = fuzzySearch(allProducts, search);
      console.log('🎯 Results:', results.length);
      return res.json(results);
    }
    
    res.json(allProducts);
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products', (req, res) => {
  try {
    const { search } = req.query;
    let allProducts = db.prepare('SELECT * FROM products').all();
    // Map image_url to image for frontend compatibility
    allProducts = allProducts.map(p => ({ ...p, image: p.image_url }));
    
    if (search) {
      const results = fuzzySearch(allProducts, search);
      return res.json(results);
    }
    
    res.json(allProducts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    
    let allProducts = db.prepare('SELECT * FROM products').all();
    // Map image_url to image for frontend compatibility
    allProducts = allProducts.map(p => ({ ...p, image: p.image_url }));
    const results = fuzzySearch(allProducts, q);
    res.json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const hostname = '127.0.0.1';
const server = app.listen(PORT, hostname, () => {
  console.log('🚀 Server starting on http://' + hostname + ':' + PORT);
});

server.on('listening', () => {
  console.log('✅ Server is listening on port', PORT);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('❌ Port', PORT, 'is already in use');
    process.exit(1);
  } else {
    console.error('❌ Server error:', err.message);
  }
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled rejection:', err.message);
});
