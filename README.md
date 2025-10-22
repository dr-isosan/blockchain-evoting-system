# ELECTRYPTION
# E-Voting System - Blockchain-Based Electronic Voting System

[🇹🇷 Türkçe](#turkish) | [🇬🇧 English](#english)

---

## <a name="turkish"></a>🇹🇷 Türkçe

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

- İshak DURAN
- İbrahim GÜNEŞ
- Cuma TALJİBİNİ

---

**Not**: Production'a almadan önce:

1. Tüm `.env` dosyalarındaki değerleri güvenli olanlarla değiştirin
2. Admin şifresini değiştirin
3. JWT_SECRET'ı güçlü bir değerle değiştirin
4. Database şifrelerini güvenli hale getirin

---

## <a name="english"></a>🇬🇧 English

## 📋 About the Project

This is a graduation project that provides a secure and transparent electronic voting system using blockchain technology. The system consists of Ethereum blockchain, React frontend, and Node.js backend.

## 🏗️ Project Structure

```
e-vote/
├── frontend/          # React-based user interface
├── backend/           # Node.js/Express API server
├── block/             # Hardhat/Ethereum smart contracts
└── database/          # MySQL database schema
```

## 🛠️ Technologies

### Frontend
- React 19.1.0
- React Router DOM 7.6.0
- Axios
- Lucide React (Icons)
- Tailwind CSS

### Backend
- Node.js
- Express 5.1.0
- MySQL
- JWT (Authentication)
- bcrypt (Encryption)

### Blockchain
- Hardhat 2.24.0
- Ethers.js 6.14.0
- Solidity 0.8.22
- OpenZeppelin Contracts 5.3.0

## 📦 Installation

### Requirements
- Node.js (v16 or higher)
- MySQL
- Git

### 1. Clone the Project

```bash
git clone <repository-url>
cd e-vote
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill it with your information:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=evoting_db
JWT_SECRET=your-very-secret-jwt-key
PORT=3003
```

### 3. Database Setup

Log in to MySQL and create the database:

```bash
mysql -u root -p < database/edb.sql
```

### 4. Blockchain Setup

```bash
cd block
npm install
```

### 5. Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### 1. Start the Blockchain Node

Open a new terminal:

```bash
cd block
npx hardhat node
```

### 2. Deploy Smart Contracts

Open another terminal:

```bash
cd block
npx hardhat run scripts/deploy_VoteToken.js --network localhost
```

### 3. Start the Backend Server

Open another terminal:

```bash
cd backend
node edb.js
```

### 4. Start the Frontend Application

Open another terminal:

```bash
cd frontend
npm start
```

The application will run at `http://localhost:3000`.

## 🔑 Features

- ✅ Blockchain-based secure voting
- ✅ Voter registration and verification system
- ✅ Admin panel
- ✅ Candidate management
- ✅ Real-time vote counting
- ✅ JWT-based authentication
- ✅ Transparent and immutable vote records

## 🔐 Security

- Passwords are hashed with bcrypt
- Secure session management with JWT tokens
- Immutable records on blockchain
- Voter verification with national ID number

## 📝 Default Admin Credentials

**⚠️ MUST BE CHANGED IN PRODUCTION!**

- Username: `admin`
- Password: (hashed version available in database/edb.sql file)

## 🤝 Contributing

This is a graduation project. You can open issues for suggestions.

## 📄 License

This project is developed for educational purposes.

## 👥 Developers

- [İshak DURAN] (https://github.com/dr-isosan)
- [İbrahim GÜNEŞ] (https://github.com/ibra465-gunes)
- Cuma TALJİBİNİ

---

**Note**: Before taking to production:

1. Replace all values in `.env` files with secure ones
2. Change the admin password
3. Replace JWT_SECRET with a strong value
4. Secure database passwords
