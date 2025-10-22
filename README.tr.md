# E-Voting System - Blockchain Based Electronic Voting

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-19.1.0-blue)](https://reactjs.org/)
[![Hardhat](https://img.shields.io/badge/hardhat-2.24.0-orange)](https://hardhat.org/)

Blockchain teknolojisi kullanarak güvenli, şeffaf ve değiştirilemez bir elektronik oylama sistemi.

## 📸 Ekran Görüntüleri

*(Buraya uygulamanızın ekran görüntülerini ekleyebilirsiniz)*

## 🎯 Özellikler

- 🔐 **Güvenli Kimlik Doğrulama**: JWT ve bcrypt ile güvenli kullanıcı yönetimi
- ⛓️ **Blockchain Entegrasyonu**: Ethereum blockchain üzerinde değiştirilemez oy kayıtları
- 👤 **Kullanıcı Yönetimi**: Seçmen kaydı ve TC kimlik doğrulama
- 🎭 **Admin Paneli**: Seçim yönetimi ve aday ekleme
- 📊 **Gerçek Zamanlı Sonuçlar**: Anlık oy sayımı ve sonuç görüntüleme
- 🔍 **Şeffaflık**: Blockchain üzerinde tüm oyların takibi

## 🏗️ Teknoloji Stack

### Frontend
- React 19.1.0
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js & Express
- MySQL Database
- JWT Authentication
- bcrypt Password Hashing

### Blockchain
- Hardhat Development Environment
- Solidity 0.8.22
- Ethers.js
- OpenZeppelin Contracts

## 📋 Gereksinimler

- Node.js v16 veya üzeri
- MySQL Server
- Git
- MetaMask veya benzeri Ethereum cüzdanı (opsiyonel)

## 🚀 Hızlı Başlangıç

### 1. Projeyi İndirin
```bash
git clone https://github.com/YOUR_USERNAME/e-vote.git
cd e-vote
```

### 2. Bağımlılıkları Yükleyin

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Blockchain
cd ../block
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

```bash
# Backend
cd backend
cp .env.example .env
# .env dosyasını kendi bilgilerinizle düzenleyin

# Block (opsiyonel)
cd ../block
cp .env.example .env
```

### 4. Veritabanını Kurun

```bash
mysql -u root -p < database/edb.sql
```

### 5. Uygulamayı Başlatın

**Terminal 1 - Blockchain Node:**
```bash
cd block
npx hardhat node
```

**Terminal 2 - Smart Contract Deploy:**
```bash
cd block
npx hardhat run scripts/deploy_VoteToken.js --network localhost
```

**Terminal 3 - Backend:**
```bash
cd backend
node edb.js
```

**Terminal 4 - Frontend:**
```bash
cd frontend
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır! 🎉

## 📚 Dokümantasyon

- [Kurulum Rehberi](README.md#kurulum)
- [Güvenlik](SECURITY.md)
- [Katkıda Bulunma](CONTRIBUTING.md)

## 🔒 Güvenlik

⚠️ **ÖNEMLİ**: Production'a almadan önce:
- [ ] Tüm şifreleri ve secret key'leri değiştirin
- [ ] `.env` dosyalarını Git'e **ASLA** commit etmeyin
- [ ] Admin hesabının şifresini güçlü bir şifre ile değiştirin
- [ ] HTTPS kullanın
- [ ] CORS ayarlarını production için yapılandırın

Detaylı bilgi için [SECURITY.md](SECURITY.md) dosyasına bakın.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun.

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: amazing feature eklendi'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Geliştiriciler

KUT Bilgisayar Mühendisliği Bitirme Projesi - 2025

## 📧 İletişim

Proje Linki: [https://github.com/YOUR_USERNAME/e-vote](https://github.com/YOUR_USERNAME/e-vote)

## 🙏 Teşekkürler

- [OpenZeppelin](https://openzeppelin.com/) - Güvenli smart contract kütüphaneleri
- [Hardhat](https://hardhat.org/) - Ethereum geliştirme ortamı
- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
