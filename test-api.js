const http = require('http');

function testAPI() {
  console.log('🧪 Testing /list endpoint...');
  
  const req = http.get('http://localhost:5000/list', (res) => {
    let data = '';
    
    res.on('data', chunk => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const products = JSON.parse(data);
        console.log('✅ Success! Found', products.length, 'products');
        console.log('📦 First product:', products[0]?.name, '- $' + products[0]?.price);
        
        // Test search
        console.log('\n🧪 Testing /list?search=fifa...');
        const searchReq = http.get('http://localhost:5000/list?search=fifa', (searchRes) => {
          let searchData = '';
          searchRes.on('data', chunk => searchData += chunk);
          searchRes.on('end', () => {
            const results = JSON.parse(searchData);
            console.log('✅ Search results:', results.length, 'products');
            console.log('🎮 Found:', results.map(p => p.name).join(', '));
          });
        });
        
        searchReq.on('error', e => console.error('Search error:', e.message));
      } catch (e) {
        console.error('Parse error:', e.message);
        console.error('Response:', data.substring(0, 200));
      }
    });
  });
  
  req.on('error', e => {
    console.error('❌ Connection error:', e.message);
    console.error('Is the server running on port 5000?');
  });
}

testAPI();
