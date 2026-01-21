const http = require('http');

console.log('Testing if server is responding...');

setTimeout(() => {
  http.get('http://localhost:5000/api/health', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => console.log('✅ Server OK:', data));
  }).on('error', e => console.error('❌ Server not responding:', e.message));
}, 1000);
