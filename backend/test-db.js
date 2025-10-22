require('dotenv').config({ path: './edb.env' });
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('Environment variables:');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'evoting_db'
    });

    console.log('✅ MySQL bağlantısı başarılı!');
    await connection.end();
  } catch (error) {
    console.error('❌ MySQL bağlantı hatası:', error.message);
    console.error('Error code:', error.code);
    console.error('Error errno:', error.errno);
  }
}

testConnection();
