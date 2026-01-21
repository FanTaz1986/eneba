const db = require('./database/connection');

const products = db.prepare('SELECT id, name, price, region, likes, category FROM products ORDER BY id').all();

console.log('\n📊 GAMES DATABASE VERIFICATION');
console.log('═'.repeat(100));
console.log(
  'ID | Game Name'.padEnd(40) +
  ' | Price | Region | Likes | Category'
);
console.log('─'.repeat(100));

products.forEach(p => {
  const id = p.id.toString().padEnd(3);
  const name = p.name.padEnd(36);
  const price = ('$' + p.price).padEnd(8);
  const region = p.region.padEnd(8);
  const likes = p.likes.toString().padEnd(6);
  const category = p.category;
  
  console.log(id + '| ' + name + ' | ' + price + ' | ' + region + ' | ' + likes + ' | ' + category);
});

console.log('═'.repeat(100));
console.log(`✅ Total Games: ${products.length}`);
console.log('\n📁 Image Files Created:');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'database');
const files = fs.readdirSync(dbPath).filter(f => f.endsWith('.jpg'));
files.forEach((f, idx) => {
  console.log(`  ${idx + 1}. ${f}`);
});
console.log(`\n✨ Database setup complete! All images stored in: database/`);
