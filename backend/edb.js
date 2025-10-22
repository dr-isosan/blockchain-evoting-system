require('dotenv').config({ path: './edb.env' });
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const os = require("os");

// Linux uyumlu dinamik IP alma fonksiyonu
function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();

  // Öncelikli arayüz isimleri (Linux/Unix/Windows uyumlu)
  const priorityInterfaces = ['eth0', 'enp3s0', 'wlo1', 'wlan0', 'Wi-Fi', 'Ethernet'];

  // Öncelikli arayüzleri kontrol et
  for (const interfaceName of priorityInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    if (networkInterface) {
      const ipv4 = networkInterface.find(info => info.family === 'IPv4' && !info.internal);
      if (ipv4) {
        console.log(`✅ IP adresi bulundu (${interfaceName}):`, ipv4.address);
        return ipv4.address;
      }
    }
  }

  // Eğer öncelikli arayüz bulunamazsa, tüm arayüzleri tara
  for (const [interfaceName, networkInterface] of Object.entries(networkInterfaces)) {
    const ipv4 = networkInterface.find(info => info.family === 'IPv4' && !info.internal);
    if (ipv4) {
      console.log(`✅ IP adresi bulundu (${interfaceName}):`, ipv4.address);
      return ipv4.address;
    }
  }

  console.log("⚠️ Dinamik IP bulunamadı, localhost kullanılıyor");
  return "localhost";
}

const localIP = getLocalIP();
console.log("🌐 Sunucunun IP Adresi:", localIP);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get('/api/test', async (req, res) => {
  res.json({ message: "API çalışıyor!" });
});
// Veritabanı bağlantı havuzu
console.log('🔗 MySQL Connection Config:', {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'evoting_db'
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', // Güvenlik için localhost zorla
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'evoting_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'evoting-blockchain-gizli-anahtar';
const TOKEN_EXPIRE = '24h';

// Yardımcı fonksiyonlar
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user, isAdmin = false) => {
  return jwt.sign(
    {
      id: user.id,
      tcNo: isAdmin ? null : user.tc_no,
      isAdmin: isAdmin
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRE }
  );
};

// Auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Geçersiz token' });
  }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Bu işlem için admin yetkisi gerekli' });
  }
  next();
};
async function getAvailableHardhatAddress() {
  try {
    const response = await fetch(`http://${localIP}:4000/api/hardhatAddresses`);
    const { success, addresses } = await response.json();
    if (!success) throw new Error("Hardhat API hatası");

    if (addresses.length === 0) throw new Error("Hiç Hardhat adresi bulunamadı");

    // İlk adresi hariç tut (addresses[0] hariç)
    const remainingAddresses = addresses.slice(1);

    // Veritabanındaki kayıtlı adresleri çek
    const [registeredAddresses] = await pool.query("SELECT blockchain_adres FROM secmenler");

    // Kullanılmayan adresi bul
    const registeredSet = new Set(registeredAddresses.map(row => row.blockchain_adres));
    const availableAddress = remainingAddresses.find(address => !registeredSet.has(address));
    if (availableAddress) return availableAddress;

    // ⚠️ Adres kalmadıysa: API üzerinden yeni cüzdan oluştur
    const createRes = await fetch(`http://${localIP}:4000/api/createWalletWithBalance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ethAmount: "1.0" })
    });

    const { success: created, wallet } = await createRes.json();
    if (created && wallet?.address) {
      console.log("➕ Yeni cüzdan oluşturuldu:", wallet.address);
      return wallet.address;
    }
    throw new Error("Yeni adres oluşturulamadı");
    //return availableAddress || null; // Kullanılabilir adres yoksa null döndür
  } catch (error) {
    console.error("Adres çekme hatası:", error);
    return null;
  }
}
// ROUTES

// 1. Seçmen Kayıt (Register)
app.post('/api/secmen/kayit', async (req, res) => {
  try {
    const { isim, soyisim, tc_no, sifre } = req.body;

    // Validasyon
    if (!isim || !soyisim || !tc_no || !sifre) {
      return res.status(400).json({ error: 'Tüm alanları doldurun' });
    }

    if (tc_no.length !== 11 || !/^\d+$/.test(tc_no)) {
      return res.status(400).json({ error: 'Geçerli bir TC kimlik numarası girin (11 haneli sayı)' });
    }

    // TC No kontrol
    const [existingUsers] = await pool.query('SELECT * FROM secmenler WHERE tc_no = ?', [tc_no]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'Bu TC kimlik numarası zaten kayıtlı' });
    }

    // Kullanılmayan Hardhat hesap adresini al
    const blockchain_adres = await getAvailableHardhatAddress();
    if (!blockchain_adres) {
      return res.status(400).json({ error: 'Uygun hesap adresi bulunamadı' });
    }

    // Şifreyi hash'le
    const hashedPassword = await hashPassword(sifre);

    // Veritabanına kaydet
    const [result] = await pool.query(
      'INSERT INTO secmenler (isim, soyisim, tc_no, sifre, blockchain_adres) VALUES (?, ?, ?, ?, ?)',
      [isim, soyisim, tc_no, hashedPassword, blockchain_adres]
    );

    // Token oluştur
    const user = { id: result.insertId, tc_no, isim, soyisim, blockchain_adres };
    const token = generateToken(user);

    res.status(201).json({
      message: 'Kayıt başarılı',
      user,
      token
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});
// 2. Seçmen Giriş (Login)
/*app.post('/api/secmen/giris', async (req, res) => {
  try {
    const { tc_no, sifre } = req.body;

    // Validasyon
    if (!tc_no || !sifre) {
      return res.status(400).json({ error: 'TC kimlik numarası ve şifre gerekli' });
    }

    // Kullanıcıyı bul
    const [users] = await pool.query(
      'SELECT * FROM secmenler WHERE tc_no = ?',
      [tc_no]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }

    const user = users[0];

    // Şifreyi kontrol et
    const isMatch = await comparePassword(sifre, user.sifre);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }

    // Token oluştur
    const token = generateToken(user);

    res.json({
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        isim: user.isim,
        soyisim: user.soyisim,
        tc_no: user.tc_no
      },
      token
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});*/
app.post('/api/secmen/giris', async (req, res) => {
  console.log("Gelen veri:", req.body);
  try {

    const { tc_no, sifre } = req.body;

    // Validasyon
    if (!tc_no || !sifre) {
      return res.status(400).json({ error: 'TC kimlik numarası ve şifre gerekli' });
    }

    // Kullanıcıyı bul
    const [users] = await pool.query('SELECT * FROM secmenler WHERE tc_no = ?', [tc_no]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }

    const user = users[0];

    // Şifreyi kontrol et
    const isMatch = await comparePassword(sifre, user.sifre);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }

    // Token oluştur
    const token = generateToken(user);

    // DEBUG: Konsolda kontrol edelim
    console.log("Oluşturulan Token:", token);

    res.json({
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        isim: user.isim,
        soyisim: user.soyisim,
        tc_no: user.tc_no
      },
      token
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});
// 3. Admin Giriş
app.post('/api/admin/giris', async (req, res) => {
  try {
    const { kullanici_adi, sifre } = req.body;

    // Validasyon
    if (!kullanici_adi || !sifre) {
      return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
    }

    // Admin kullanıcısını bul
    const [admins] = await pool.query(
      'SELECT * FROM admin WHERE kullanici_adi = ?',
      [kullanici_adi]
    );

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }
    console.log("Admins", admins);
    const admin = admins[0];
    console.log(admin.sifre);
    // Şifreyi kontrol et
    const isMatch = await comparePassword(sifre, admin.sifre);
    console.log("Şifre eşleşiyor mu?", isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }

    // Token oluştur
    const token = generateToken(admin, true);

    res.json({
      message: 'Admin girişi başarılı',
      user: {
        id: admin.id,
        kullanici_adi: admin.kullanici_adi,
        isAdmin: true
      },
      token
    });
  } catch (error) {
    console.error('Admin giriş hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// 4. Kullanıcı bilgilerini getir (Token ile)
app.get('/api/kullanici', authMiddleware, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      // Admin kullanıcısı için
      const [admins] = await pool.query(
        'SELECT id, kullanici_adi FROM admin WHERE id = ?',
        [req.user.id]
      );

      if (admins.length === 0) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }

      return res.json({
        user: {
          id: admins[0].id,
          kullanici_adi: admins[0].kullanici_adi,
          isAdmin: true
        }
      });
    } else {
      // Seçmen için
      const [users] = await pool.query(
        'SELECT id, isim, soyisim, tc_no FROM secmenler WHERE id = ?',
        [req.user.id]
      );

      if (users.length === 0) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }

      return res.json({
        user: {
          id: users[0].id,
          isim: users[0].isim,
          soyisim: users[0].soyisim,
          tc_no: users[0].tc_no,
          isAdmin: false
        }
      });
    }
  } catch (error) {
    console.error('Kullanıcı bilgileri hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// 5. Admin: Tüm seçmenleri listele
app.get('/api/secmenler', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [secmenler] = await pool.query(
      'SELECT id, isim, soyisim, tc_no, kayit_tarihi FROM secmenler'
    );

    res.json({ secmenler });
  } catch (error) {
    console.error('Seçmenleri listeleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});
// 6. Kullanıcının TC Kimlik Numarasına Göre Adresini Getir
app.get("/api/secmen/adres", authMiddleware, async (req, res) => {
  try {
    const tcNo = req.user.tcNo; // Token içinden TC'yi al
    if (!tcNo) {
      return res.status(400).json({ error: "TC kimlik numarası bulunamadı!" });
    }

    const [result] = await pool.query(
      "SELECT blockchain_adres FROM secmenler WHERE tc_no = ?",
      [tcNo]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Bu TC kimlik numarasına bağlı adres bulunamadı!" });
    }

    res.json({ success: true, voterAddress: result[0].blockchain_adres });
  } catch (error) {
    console.error("Adres çekme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
});
app.get('/api/secmen/isimler', async (req, res) => {
  try {
    let { addresses } = req.query; // Adres dizisini al
    console.log("API'ye gelen adresler:", addresses);
    // Eğer gelen adresler string ise, JSON formatında parse edelim
    if (typeof addresses === "string") {
      try {
        addresses = JSON.parse(addresses);
      } catch (error) {
        return res.status(400).json({ error: "Adres listesi düzgün formatta değil!" });
      }
    }

    if (!addresses || !Array.isArray(addresses)) {
      return res.status(400).json({ error: "Geçerli bir adres listesi gönderin!" });
    }

    // Veritabanından isim, soyisim ve adres eşleşmelerini çek
    const [results] = await pool.query(
      `SELECT isim, soyisim, blockchain_adres FROM secmenler WHERE blockchain_adres IN (?)`,
      [addresses]
    );

    res.json({ success: true, data: results });
  } catch (error) {
    console.error("İsim ve soyisim getirme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
});

// Server'ı başlat
const PORT = process.env.PORT || 3003;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});



module.exports = app;


// hardhatten adresleri getirme ve belli sayidan sonra adres uretme


