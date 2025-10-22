# GitHub'a Yükleme Rehberi

Bu dokümantasyon, projenizi GitHub'a nasıl yükleyeceğinizi adım adım açıklar.

## ⚠️ Yüklemeden ÖNCE Mutlaka Yapın!

### 1. Hassas Bilgileri Kontrol Edin

```bash
# backend/edb.env dosyasını kontrol edin
cat backend/edb.env
```

**Bu dosyada GERÇEk şifreler varsa:**
- Bu dosya `.gitignore` ile ignore edilmiştir
- Yine de git add yapmadan önce tekrar kontrol edin

### 2. Git Repository'yi Başlatın

```bash
cd /home/dr_iso/KUT/e-vote

# Git repository'yi başlat
git init

# Tüm dosyaları staging area'ya ekle
git add .

# İlk commit'i yap
git commit -m "Initial commit: E-Voting System"
```

### 3. GitHub'da Yeni Repository Oluşturun

1. https://github.com adresine gidin
2. "New repository" butonuna tıklayın
3. Repository adını girin (örn: `e-vote` veya `blockchain-voting-system`)
4. Açıklama ekleyin (opsiyonel)
5. **Public** veya **Private** seçin
6. **README, .gitignore veya LICENSE eklemeyin** (zaten var)
7. "Create repository" butonuna tıklayın

### 4. GitHub'a Push Edin

```bash
# Remote repository ekle (YOUR_USERNAME'i kendi kullanıcı adınızla değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/e-vote.git

# Main branch'e geç
git branch -M main

# GitHub'a push et
git push -u origin main
```

## 🔍 Push Öncesi Son Kontroller

```bash
# Git status kontrol et
git status

# Hangi dosyaların commit edileceğini gör
git ls-files

# .env dosyalarının OLMAMASI gerekir
git ls-files | grep -E '\.env$|edb\.env'
# Bu komut hiçbir şey dönmemeli!

# artifacts ve cache klasörlerinin OLMAMASI gerekir
git ls-files | grep -E 'artifacts/|cache/'
# Bu da hiçbir şey dönmemeli!
```

## ⚠️ Eğer Hassas Dosya Commit Edilmişse

```bash
# Son commit'i geri al
git reset HEAD~1

# .gitignore'u kontrol et ve düzelt
# Sonra tekrar commit et
git add .
git commit -m "Initial commit: E-Voting System"
```

## 📋 Commit Edilmesi GEREKEN Dosyalar

✅ Kaynak kodlar (`.js`, `.jsx`, `.sol` dosyaları)
✅ `package.json` dosyaları
✅ `.gitignore` dosyaları
✅ `.env.example` dosyaları
✅ `README.md` ve diğer dokümantasyon
✅ `LICENSE` dosyası
✅ SQL schema dosyası (`database/edb.sql`)

## ❌ Commit EDİLMEMESİ GEREKEN Dosyalar

❌ `node_modules/` klasörleri
❌ `.env` dosyaları
❌ `backend/edb.env` (gerçek şifreler içeriyor)
❌ `block/artifacts/` klasörü
❌ `block/cache/` klasörü
❌ `frontend/build/` klasörü
❌ Şifre veya API key içeren dosyalar

## 🎉 Başarılı Yükleme Sonrası

1. GitHub repository sayfanıza gidin
2. README.md dosyasının düzgün göründğünü kontrol edin
3. Hassas dosyaların yüklenmediğini doğrulayın
4. Repository'yi **Public** yaptıysanız, başkalarının görebileceğini unutmayın

## 🔄 Sonraki Güncellemeler

```bash
# Değişiklikleri kontrol et
git status

# Değişiklikleri ekle
git add .

# Commit et
git commit -m "feat: yeni özellik eklendi"

# Push et
git push origin main
```

## 🆘 Sorun Giderme

### "Permission denied" hatası
```bash
# SSH key kurulumu gerekebilir veya
# HTTPS ile personal access token kullanın
```

### Hassas dosya yanlışlıkla push edildi
```bash
# Git history'den tamamen sil
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/edb.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (DİKKATLİ KULLAN!)
git push origin --force --all
```

## 📞 Yardım

Sorun yaşarsanız:
1. Git hatalarını Google'da arayın
2. GitHub Documentation'a bakın
3. Stack Overflow'da sorun

---

**Son Kontrol**: Git push yapmadan önce `git status` ve `git ls-files` komutlarını çalıştırın!
