// API base URLs için dinamik konfigürasyon
const getApiBaseUrl = () => {
  // Eğer production modda ise ve REACT_APP_API_URL tanımlıysa kullan
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Development modda dinamik IP kullan
  const hostname = window.location.hostname;

  // Eğer localhost veya 127.0.0.1 değilse, sunucu IP'sini kullan
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return `http://${hostname}`;
  }

  // Fallback olarak localhost kullan
  return 'http://localhost';
};

// Backend API (port 3003)
export const BACKEND_API_URL = `${getApiBaseUrl()}:3003`;

// Blockchain API (port 4000)
export const BLOCKCHAIN_API_URL = `${getApiBaseUrl()}:4000`;

// Hardhat RPC (port 8545)
export const HARDHAT_RPC_URL = `${getApiBaseUrl()}:8545`;

// API URL'lerini logla
console.log('🌐 API Configuration:');
console.log('Backend API:', BACKEND_API_URL);
console.log('Blockchain API:', BLOCKCHAIN_API_URL);
console.log('Hardhat RPC:', HARDHAT_RPC_URL);
