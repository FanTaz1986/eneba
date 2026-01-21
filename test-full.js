#!/usr/bin/env node
// Simple test to verify API is working

const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    console.log(`📤 Requesting: http://localhost:5000${path}`);
    
    const req = http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ Success (${res.statusCode}):`, Array.isArray(json) ? `${json.length} items` : json);
          resolve(json);
        } catch (e) {
          console.error(`❌ Parse error:`, e.message);
          reject(e);
        }
      });
    });
    
    req.on('error', err => {
      console.error(`❌ Request failed:`, err.message);
      reject(err);
    });
    
    // Timeout after 5 seconds
    req.setTimeout(5000, () => {
      req.destroy();
      console.error('❌ Request timeout');
      reject(new Error('Timeout'));
    });
  });
}

async function runTests() {
  console.log('🧪 Testing API endpoints...\n');
  
  try {
    // Test 1: Get all products
    console.log('Test 1: GET /list');
    const all = await makeRequest('/list');
    console.log();
    
    // Test 2: Search for FIFA
    console.log('Test 2: GET /list?search=fifa');
    const fifa = await makeRequest('/list?search=fifa');
    console.log();
    
    // Test 3: Health check
    console.log('Test 3: GET /api/health');
    await makeRequest('/api/health');
    console.log();
    
    console.log('✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
  }
}

runTests();
