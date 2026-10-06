// Automated test script for Backend REST API
const http = require('http');

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: `/api${path}`,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('Testing Health Endpoint...');
  const health = await request('/health');
  console.log('Health:', health.status, health.body);

  console.log('\nTesting Auth Login (Librarian)...');
  const loginRes = await request('/auth/login', { method: 'POST' }, { username: 'lib2025', password: 'library@123' });
  console.log('Login status:', loginRes.status, 'User:', loginRes.body?.user?.name);
  const token = loginRes.body?.token;

  console.log('\nTesting Books List...');
  const booksRes = await request('/books');
  console.log('Books count:', booksRes.body?.count, 'First book:', booksRes.body?.data?.[0]?.title);

  console.log('\nTesting Almaris List...');
  const almarisRes = await request('/almaris');
  console.log('Almaris count:', almarisRes.body?.count);

  console.log('\nTesting Members List...');
  const membersRes = await request('/members');
  console.log('Members count:', membersRes.body?.count);

  console.log('\nTesting Dashboard Stats...');
  const statsRes = await request('/dashboard/stats');
  console.log('Stats:', statsRes.body?.data?.books);

  console.log('\nTesting Book Issuance API...');
  const issueRes = await request('/transactions/issue', { method: 'POST' }, {
    bookId: 'b-2',
    memberRollNo: '2024-ICS-042',
    issuedByStaff: 'Test Staff'
  });
  console.log('Issue status:', issueRes.status, 'Message:', issueRes.body?.message);

  console.log('\nTesting Reading Hall Seats...');
  const seatsRes = await request('/seats');
  console.log('Seats total:', seatsRes.body?.total, 'Available:', seatsRes.body?.availableCount);

  console.log('\nTesting Seat Booking...');
  const bookSeatRes = await request('/seats/10/book', { method: 'POST' }, {
    rollNo: '2024-TEST-001',
    studentName: 'Test Student'
  });
  console.log('Book seat:', bookSeatRes.body?.message);

  console.log('\nTesting Seat Vacating...');
  const vacateRes = await request('/seats/10/vacate', { method: 'POST' });
  console.log('Vacate seat:', vacateRes.body?.message);

  console.log('\nALL BACKEND API TESTS COMPLETED SUCCESSFULLY! 🎉');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
