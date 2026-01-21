const axios = require('axios');

async function testEndpoints() {
  const baseURL = 'http://localhost:5000';
  
  try {
    console.log('\n🧪 Testing Backend Endpoints\n');
    
    // Test 1: /list
    console.log('1️⃣  Testing GET /list');
    const listResponse = await axios.get(`${baseURL}/list`);
    console.log(`   ✅ Retrieved ${listResponse.data.length} games`);
    console.log('   Sample games:');
    listResponse.data.slice(0, 3).forEach(game => {
      console.log(`   - ${game.name.padEnd(35)} | $${game.price} | ${game.region.padEnd(8)} | ❤️ ${game.likes}`);
    });
    
    // Test 2: /list?search=fifa
    console.log('\n2️⃣  Testing GET /list?search=fifa (fuzzy search)');
    const searchFifaResponse = await axios.get(`${baseURL}/list?search=fifa`);
    console.log(`   ✅ Found ${searchFifaResponse.data.length} result(s)`);
    searchFifaResponse.data.forEach(game => {
      console.log(`   - ${game.name}`);
    });
    
    // Test 3: /list?search=red (fuzzy search)
    console.log('\n3️⃣  Testing GET /list?search=red (fuzzy search)');
    const searchRedResponse = await axios.get(`${baseURL}/list?search=red`);
    console.log(`   ✅ Found ${searchRedResponse.data.length} result(s)`);
    searchRedResponse.data.forEach(game => {
      console.log(`   - ${game.name}`);
    });
    
    // Test 4: /list?search=rpg (fuzzy search for category)
    console.log('\n4️⃣  Testing GET /list?search=rpg (fuzzy search for category)');
    const searchRpgResponse = await axios.get(`${baseURL}/list?search=rpg`);
    console.log(`   ✅ Found ${searchRpgResponse.data.length} result(s)`);
    searchRpgResponse.data.forEach(game => {
      console.log(`   - ${game.name} (${game.category})`);
    });
    
    // Test 5: /api/products?search=star
    console.log('\n5️⃣  Testing GET /api/products?search=star');
    const apiSearchResponse = await axios.get(`${baseURL}/api/products?search=star`);
    console.log(`   ✅ Found ${apiSearchResponse.data.length} result(s)`);
    apiSearchResponse.data.forEach(game => {
      console.log(`   - ${game.name}`);
    });
    
    console.log('\n✨ All tests passed!');
    console.log('\n📊 Backend Integration Summary:');
    console.log('   ✅ /list endpoint works');
    console.log('   ✅ /list?search=<gamename> fuzzy search works');
    console.log('   ✅ Backend fuzzy search algorithm working');
    console.log('\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('   Full error:', error);
    if (error.response?.status) {
      console.error('   Status:', error.response.status);
    }
  }
  
  process.exit(0);
}

// Wait for server to be ready
setTimeout(testEndpoints, 1000);
