# E-Voting System - Blockchain Tabanlı Elektronik Oylama Sistemi

## 📋 Proje Hakkında

Bu proje, blockchain teknolojisi kullanarak güvenli ve şeffaf bir elektronik oylama sistemi sunan bir bitirme projesidir. Sistem, Ethereum blockchain, React frontend ve Node.js backend'den oluşmaktadır.

## 🏗️ Proje Yapısı

```
e-vote/
├── frontend/          # React tabanlı kullanıcı arayüzü
├── backend/           # Node.js/Express API sunucusu
├── block/             # Hardhat/Ethereum smart contract'ları
└── database/          # MySQL veritabanı şeması
```

## 🛠️ Teknolojiler

### Frontend
- React 19.1.0
- React Router DOM 7.6.0
- Axios
- Lucide React (İkonlar)
- Tailwind CSS

### Backend
- Node.js
- Express 5.1.0
- MySQL
- JWT (Authentication)
- bcrypt (Şifreleme)

### Blockchain
- Hardhat 2.24.0
- Ethers.js 6.14.0
- Solidity 0.8.22
- OpenZeppelin Contracts 5.3.0

## 📦 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- MySQL
- Git

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd e-vote
```

### 2. Backend Kurulumu
```bash
cd backend
npm install
```

`.env.example` dosyasını `.env` olarak kopyalayın ve kendi bilgilerinizle doldurun:
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=evoting_db
JWT_SECRET=your-very-secret-jwt-key
PORT=3003
```

### 3. Veritabanı Kurulumu
MySQL'e giriş yapın ve veritabanını oluşturun:
```bash
mysql -u root -p < database/edb.sql
```

### 4. Blockchain Kurulumu
```bash
cd block
npm install
```

### 5. Frontend Kurulumu
```bash
cd frontend
npm install
```

## 🚀 Çalıştırma

### 1. Blockchain Node'unu Başlatın
Yeni bir terminal açın:
```bash
cd block
npx hardhat node
```

### 2. Smart Contract'ları Deploy Edin
Başka bir terminal açın:
```bash
cd block
npx hardhat run scripts/deploy_VoteToken.js --network localhost
```

### 3. Backend Sunucusunu Başlatın
Başka bir terminal açın:
```bash
cd backend
node edb.js
```

### 4. Frontend Uygulamasını Başlatın
Başka bir terminal açın:
```bash
cd frontend
npm start
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🔑 Özellikler

- ✅ Blockchain tabanlı güvenli oylama
- ✅ Seçmen kayıt ve doğrulama sistemi
- ✅ Admin paneli
- ✅ Aday yönetimi
- ✅ Gerçek zamanlı oy sayımı
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Şeffaf ve değiştirilemez oy kayıtları

## 🔐 Güvenlik

- Şifreler bcrypt ile hash'lenir
- JWT token'ları ile güvenli oturum yönetimi
- Blockchain üzerinde değiştirilemez kayıtlar
- TC kimlik numarası ile seçmen doğrulama

## 📝 Varsayılan Admin Bilgileri

**⚠️ ÜRETİMDE MUTLAKA DEĞİŞTİRİN!**

- Kullanıcı Adı: `admin`
- Şifre: (database/edb.sql dosyasında hash'lenmiş hali mevcut)

## 🤝 Katkıda Bulunma

Bu bir bitirme projesidir. Önerileriniz için issue açabilirsiniz.

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👥 Geliştiriciler

İshak DURAN
İbrahim GÜNEŞ
Cuma TALJİBİNİ

---

**Not**: Production'a almadan önce:
1. Tüm `.env` dosyalarındaki değerleri güvenli olanlarla değiştirin
2. Admin şifresini değiştirin
3. JWT_SECRET'ı güçlü bir değerle değiştirin
4. Database şifrelerini güvenli hale getirin
