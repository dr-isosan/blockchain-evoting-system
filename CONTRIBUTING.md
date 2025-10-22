# 🤝 Katkıda Bulunma Rehberi

## Projeye Nasıl Katkıda Bulunulur?

Bu proje bir bitirme projesidir. Katkılarınızı memnuniyetle karşılıyoruz!

### 1. Fork ve Clone

```bash
# Projeyi fork edin (GitHub'da)
# Sonra klonlayın
git clone https://github.com/YOUR_USERNAME/e-vote.git
cd e-vote
```

### 2. Branch Oluşturun

```bash
git checkout -b feature/yeni-ozellik
# veya
git checkout -b fix/hata-duzeltme
```

### 3. Değişikliklerinizi Yapın

- Kodunuzun mevcut stil ile uyumlu olduğundan emin olun
- Yorum satırları ekleyin
- Test edin

### 4. Commit

```bash
git add .
git commit -m "feat: yeni özellik eklendi"
```

#### Commit Mesaj Formatı

```
<tip>: <açıklama>

[opsiyonel detaylı açıklama]
```

**Tipler:**
- `feat`: Yeni özellik
- `fix`: Hata düzeltme
- `docs`: Dokümantasyon
- `style`: Kod formatı
- `refactor`: Kod iyileştirme
- `test`: Test ekleme
- `chore`: Genel işler

### 5. Push ve Pull Request

```bash
git push origin feature/yeni-ozellik
```

GitHub'da Pull Request oluşturun.

## 📋 Kodlama Standartları

- **JavaScript**: ESLint kurallarına uyun
- **React**: Fonksiyonel komponentler kullanın
- **Solidity**: OpenZeppelin standartlarına uyun
- **Yorum**: Karmaşık kod bloklarını açıklayın

## 🐛 Bug Bildirimi

Issue açarken:
1. Hatayı tanımlayın
2. Tekrar etme adımlarını yazın
3. Beklenen davranış nedir?
4. Gerçekte ne oluyor?
5. Ekran görüntüsü ekleyin (varsa)

## 💡 Özellik Önerisi

1. Özelliği detaylı açıklayın
2. Neden gerekli olduğunu açıklayın
3. Kullanım senaryosu verin

## ✅ Pull Request Checklist

- [ ] Kod çalışıyor ve test edildi
- [ ] Yeni özellikler dokümante edildi
- [ ] Commit mesajları açıklayıcı
- [ ] Çakışma yok
- [ ] `.gitignore` hassas dosyaları içeriyor

---

Teşekkürler! 🙏
