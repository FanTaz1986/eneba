// Add this to browser console to debug
window.debugAPI = async () => {
  console.log('Testing API from browser...');
  try {
    const resp = await fetch('http://localhost:5000/list');
    console.log('Response status:', resp.status);
    const data = await resp.json();
    console.log('✅ Products loaded:', data.length, 'items');
    console.log('First product:', data[0]);
  } catch (e) {
    console.error('❌ Error:', e.message);
  }
};

console.log('To debug API, run: debugAPI()');
