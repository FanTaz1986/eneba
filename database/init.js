const Database = require('better-sqlite3');
const path = require('path');

// Create database file in database folder
const dbPath = path.join(__dirname, 'eneba.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log('🗄️  Initializing database...');

// Drop existing tables (for testing)
db.exec(`
  DROP TABLE IF EXISTS cart_items;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
`);

// Create Products table
db.exec(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    rating REAL DEFAULT 4.5,
    reviews INTEGER DEFAULT 0,
    discount INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 100,
    region TEXT,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create Users table (optional)
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create Cart Items table
db.exec(`
  CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  )
`);

// Create Orders table
db.exec(`
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Insert sample products - Games
const products = [
  {
    name: 'FIFA 23',
    price: 49.99,
    category: 'Sports',
    description: 'Experience the ultimate football simulation with FIFA 23. Create your ultimate team, compete in divisions, and build the squad of your dreams.',
    image_url: '/database/fifa23.jpg',
    rating: 4.6,
    reviews: 1240,
    discount: 15,
    stock: 85,
    region: 'Global',
    likes: 3450,
  },
  {
    name: 'Red Dead Redemption 2',
    price: 59.99,
    category: 'Action-Adventure',
    description: 'Epic western adventure set in a rich and detailed open world. Experience the story of outlaw Arthur Morgan in the decline of the Wild West.',
    image_url: '/database/reddead2.jpg',
    rating: 4.9,
    reviews: 2156,
    discount: 10,
    stock: 120,
    region: 'Europe',
    likes: 5892,
  },
  {
    name: 'Split Fiction',
    price: 39.99,
    category: 'Action',
    description: 'High-octane co-op action game with stunning visuals. Control two protagonists in intense combat scenarios and complete challenging missions.',
    image_url: '/database/splitfiction.jpg',
    rating: 4.7,
    reviews: 892,
    discount: 0,
    stock: 95,
    region: 'Global',
    likes: 2456,
  },
  {
    name: 'The Legend of Zelda: Tears of the Kingdom',
    price: 69.99,
    category: 'Adventure',
    description: 'Explore a vast open world with endless possibilities. Solve puzzles and uncover secrets in this legendary sequel on Nintendo Switch.',
    image_url: '/database/zelda.jpg',
    rating: 4.8,
    reviews: 3012,
    discount: 0,
    stock: 150,
    region: 'Europe',
    likes: 7123,
  },
  {
    name: 'Elden Ring',
    price: 59.99,
    category: 'RPG',
    description: 'Experience the challenging world of Elden Ring. Explore an open world, engage in strategic combat, and uncover the mysteries of the Lands Between.',
    image_url: '/database/eldenring.jpg',
    rating: 4.8,
    reviews: 2834,
    discount: 5,
    stock: 110,
    region: 'Global',
    likes: 6234,
  },
  {
    name: 'Cyberpunk 2077',
    price: 44.99,
    category: 'RPG',
    description: 'Immerse yourself in the neon-lit metropolis of Night City. Play as V and navigate a cyberpunk future with countless choices and consequences.',
    image_url: '/database/cyberpunk.jpg',
    rating: 4.5,
    reviews: 2145,
    discount: 25,
    stock: 75,
    region: 'Europe',
    likes: 4567,
  },
  {
    name: 'Starfield',
    price: 69.99,
    category: 'RPG',
    description: 'Explore the vast cosmos in Bethesda\'s epic space RPG. Create your character, travel to hundreds of planets, and shape your destiny among the stars.',
    image_url: '/database/starfield.jpg',
    rating: 4.6,
    reviews: 1876,
    discount: 0,
    stock: 100,
    region: 'Global',
    likes: 5432,
  },
  {
    name: 'Call of Duty: Modern Warfare II',
    price: 69.99,
    category: 'FPS',
    description: 'Engage in intense multiplayer combat and thrilling single-player campaign. Experience the latest installment of the legendary Call of Duty franchise.',
    image_url: '/database/codmw2.jpg',
    rating: 4.4,
    reviews: 2567,
    discount: 20,
    stock: 130,
    region: 'Europe',
    likes: 3891,
  },
  {
    name: 'Hogwarts Legacy',
    price: 54.99,
    category: 'RPG',
    description: 'Become a student at Hogwarts School of Witchcraft and Wizardry. Experience life as a wizard in this immersive open-world magical adventure.',
    image_url: '/database/hogwarts.jpg',
    rating: 4.5,
    reviews: 1934,
    discount: 30,
    stock: 95,
    region: 'Global',
    likes: 4123,
  },
  {
    name: 'Baldurs Gate 3',
    price: 59.99,
    category: 'RPG',
    description: 'Experience unparalleled narrative depth and choice in this D&D-inspired RPG masterpiece. Every decision shapes your unique story.',
    image_url: '/database/baldursgate3.jpg',
    rating: 4.9,
    reviews: 3456,
    discount: 5,
    stock: 145,
    region: 'Europe',
    likes: 7891,
  },
];

// Insert products
const insertProduct = db.prepare(`
  INSERT INTO products (name, price, category, description, image_url, rating, reviews, discount, stock, region, likes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

products.forEach((product) => {
  insertProduct.run(
    product.name,
    product.price,
    product.category,
    product.description,
    product.image_url,
    product.rating,
    product.reviews,
    product.discount,
    product.stock,
    product.region,
    product.likes
  );
});

console.log('✅ Database initialized successfully!');
console.log(`📊 Created ${products.length} games in ${dbPath}`);

module.exports = db;
