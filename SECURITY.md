# 🔐 Güvenlik Uyarıları

## ⚠️ ÖNEMLİ GÜVENLİK NOTLARI

### 1. Environment Değişkenleri

**ASLA** aşağıdaki dosyaları Git'e commit etmeyin:
- `.env`
- `*.env` (`.env.example` hariç)
- `backend/edb.env`
- Gerçek şifreler veya API anahtarları içeren herhangi bir dosya

### 2. Veritabanı

- `backend/edb.env` dosyası örnek bir dosyadır ve **GERÇEk ŞİFRELER İÇERMEMELİDİR**
- Production ortamında mutlaka güçlü şifreler kullanın
- Database kullanıcısına sadece gerekli yetkileri verin

### 3. JWT Secret

- `JWT_SECRET` değerini mutlaka değiştirin
- En az 32 karakter uzunluğunda olmalıdır
- Rastgele ve tahmin edilemez olmalıdır
- Örnek: `openssl rand -base64 32` komutuyla oluşturabilirsiniz

### 4. Admin Hesabı

- Varsayılan admin şifresini **MUTLAKA** değiştirin
- Güçlü bir şifre kullanın (en az 12 karakter, özel karakterler, sayılar)
- Mümkünse 2FA (İki Faktörlü Doğrulama) ekleyin

### 5. Production Öncesi Kontrol Listesi

- [ ] Tüm `.env` dosyalarındaki şifreler değiştirildi
- [ ] `JWT_SECRET` güçlü bir değerle değiştirildi
- [ ] Admin şifresi değiştirildi
- [ ] Database şifreleri güvenli
- [ ] `.gitignore` dosyası tüm hassas dosyaları içeriyor
- [ ] HTTPS kullanılıyor (production'da)
- [ ] CORS ayarları production için yapılandırıldı
- [ ] Rate limiting eklendi
- [ ] Input validation kontrolü yapılıyor

## 📧 Güvenlik Açığı Bildirimi

Eğer bir güvenlik açığı bulursanız, lütfen bir issue açmak yerine doğrudan proje sahipleriyle iletişime geçin.

---

**Son Güncelleme**: $(date +%Y-%m-%d)
