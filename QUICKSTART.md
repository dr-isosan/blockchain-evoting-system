# 🚀 Hızlı Başlangıç - GitHub'a 3 Adımda Yükleme

## ⚡ Hızlı Özet

Projeniz GitHub'a yüklenmeye **HAZIR**!

**Güvenlik:** ✅ Hassas dosyalar korunuyor
**Dokümantasyon:** ✅ Tam
**Kod:** ✅ Değiştirilmedi

---

## 📝 3 Adımda GitHub'a Yükleme

### Adım 1️⃣: Git Repository Başlat

```bash
cd /home/dr_iso/KUT/e-vote

# Git'i başlat
git init

# Dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit: E-Voting System"
```

### Adım 2️⃣: GitHub'da Repository Oluştur

1. 🌐 https://github.com/new adresine git
2. 📝 Repository adı: `e-vote`
3. 📄 Açıklama: `Blockchain-based secure electronic voting system`
4. 🔓 **Public** veya 🔒 **Private** seç
5. ❌ README, .gitignore, LICENSE **ekleme** (zaten var)
6. ✅ "Create repository" tıkla

### Adım 3️⃣: GitHub'a Push Et

```bash
# YOUR_USERNAME'i kendi GitHub kullanıcı adınla değiştir!
git remote add origin https://github.com/YOUR_USERNAME/e-vote.git

# Main branch'e geç
git branch -M main

# Push et
git push -u origin main
```

---

## ✅ Push Öncesi Kontrol

```bash
# Hangi dosyaların gönderileceğini gör
git ls-files

# Hassas dosyaların OLMAMASI gerekir
git ls-files | grep -E '\.env$|edb\.env'
# ↑ Bu komut hiçbir şey göstermemeli!
```

---

## 🎉 Başarılı!

Repository'niz şu adreste olacak:
```
https://github.com/YOUR_USERNAME/e-vote
```

---

## 🔄 Sonraki Güncellemeler İçin

```bash
# Değişiklikleri ekle
git add .

# Commit et
git commit -m "açıklama buraya"

# Push et
git push
```

---

## 📚 Detaylı Bilgi

- 📖 Kurulum: `README.md`
- 🔒 Güvenlik: `SECURITY.md`
- 🤝 Katkı: `CONTRIBUTING.md`
- 🚀 Detaylı yükleme: `GITHUB_UPLOAD.md`

---

## 🆘 Sorun mu var?

### "Permission denied" hatası
→ SSH key kurulumu gerekebilir veya Personal Access Token kullanın

### "Repository not found"
→ Repository adını ve kullanıcı adını kontrol edin

### Hassas dosya yanlışlıkla eklendi
```bash
git reset HEAD~1
# .gitignore'u kontrol et
git add .
git commit -m "Initial commit"
```

---

**SON KONTROL:**
✅ `backend/edb.env` git'e eklenmedi
✅ `node_modules/` git'e eklenmedi
✅ `artifacts/` ve `cache/` git'e eklenmedi

**Proje hazır! 🚀**
