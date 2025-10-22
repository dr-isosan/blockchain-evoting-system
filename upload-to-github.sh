#!/bin/bash

# E-Vote Projesini GitHub'a Yükleme Scripti
# Bu script projenizi GitHub'a yüklemek için gereken adımları otomatikleştirir

echo "🚀 E-Vote GitHub Yükleme Scripti"
echo "================================"
echo ""

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Hassas dosyaları kontrol et
echo "📋 1. Hassas dosyalar kontrol ediliyor..."
if [ -f "backend/edb.env" ]; then
    echo -e "${YELLOW}⚠️  UYARI: backend/edb.env dosyası mevcut${NC}"
    echo "   Bu dosya .gitignore ile korunuyor. ✅"
else
    echo -e "${GREEN}✅ Hassas dosya bulunamadı${NC}"
fi
echo ""

# 2. .gitignore kontrolü
echo "📋 2. .gitignore dosyası kontrol ediliyor..."
if [ -f ".gitignore" ]; then
    echo -e "${GREEN}✅ .gitignore mevcut${NC}"
else
    echo -e "${RED}❌ .gitignore bulunamadı!${NC}"
    exit 1
fi
echo ""

# 3. Frontend'teki .git klasörünü sil
echo "📋 3. Frontend'teki ayrı git repository kontrol ediliyor..."
if [ -d "frontend/.git" ]; then
    echo -e "${YELLOW}⚠️  Frontend'te ayrı git repository bulundu${NC}"
    read -p "Silmek ister misiniz? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf frontend/.git
        echo -e "${GREEN}✅ Frontend .git silindi${NC}"
    fi
else
    echo -e "${GREEN}✅ Frontend temiz${NC}"
fi
echo ""

# 4. Git repository'yi başlat
echo "📋 4. Git repository başlatılıyor..."
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git repository zaten mevcut${NC}"
else
    git init
    echo -e "${GREEN}✅ Git repository başlatıldı${NC}"
fi
echo ""

# 5. Dosyaları ekle
echo "📋 5. Dosyalar ekleniyor..."
git add .
echo -e "${GREEN}✅ Dosyalar eklendi${NC}"
echo ""

# 6. Eklenen dosyaları kontrol et
echo "📋 6. Eklenen dosyalar kontrol ediliyor..."
echo "Hassas dosyalar kontrol ediliyor..."

# .env dosyalarını kontrol et
ENV_CHECK=$(git ls-files | grep -E '\.env$|edb\.env' || echo "")
if [ -z "$ENV_CHECK" ]; then
    echo -e "${GREEN}✅ Hassas .env dosyaları korunuyor${NC}"
else
    echo -e "${RED}❌ HATA: .env dosyaları Git'e eklendi!${NC}"
    echo "$ENV_CHECK"
    echo ""
    echo "Git'i sıfırlayıp .gitignore'u kontrol edin!"
    exit 1
fi

# node_modules kontrolü
NODE_CHECK=$(git ls-files | grep 'node_modules/' || echo "")
if [ -z "$NODE_CHECK" ]; then
    echo -e "${GREEN}✅ node_modules korunuyor${NC}"
else
    echo -e "${RED}❌ HATA: node_modules Git'e eklendi!${NC}"
    exit 1
fi

# artifacts/cache kontrolü
BUILD_CHECK=$(git ls-files | grep -E 'artifacts/|cache/|frontend/build/' || echo "")
if [ -z "$BUILD_CHECK" ]; then
    echo -e "${GREEN}✅ Build dosyaları korunuyor${NC}"
else
    echo -e "${RED}❌ HATA: Build dosyaları Git'e eklendi!${NC}"
    exit 1
fi
echo ""

# 7. Commit yap
echo "📋 7. Commit yapılıyor..."
git commit -m "Initial commit: E-Voting System with Blockchain Technology

- Blockchain-based voting system
- React frontend
- Node.js/Express backend
- MySQL database
- Hardhat smart contracts
- Complete documentation
- Security measures implemented"

echo -e "${GREEN}✅ Commit tamamlandı${NC}"
echo ""

# 8. Kullanıcıya bilgi ver
echo "================================"
echo -e "${GREEN}🎉 Proje GitHub'a yüklenmeye hazır!${NC}"
echo ""
echo "Sonraki adımlar:"
echo "1. GitHub'da yeni bir repository oluşturun"
echo "2. Aşağıdaki komutları çalıştırın:"
echo ""
echo -e "${YELLOW}git remote add origin https://github.com/YOUR_USERNAME/e-vote.git${NC}"
echo -e "${YELLOW}git branch -M main${NC}"
echo -e "${YELLOW}git push -u origin main${NC}"
echo ""
echo "Detaylı bilgi için GITHUB_UPLOAD.md dosyasını okuyun!"
echo ""

# 9. Git status göster
echo "📊 Git Durumu:"
git status --short
echo ""

# 10. Dosya sayısını göster
FILE_COUNT=$(git ls-files | wc -l)
echo -e "${GREEN}✅ Toplam ${FILE_COUNT} dosya commit edildi${NC}"
echo ""

echo "================================"
echo "✅ Script tamamlandı!"
