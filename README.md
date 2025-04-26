 # Todo App - Frontend

Bu proje, React.js kullanılarak geliştirilmiş bir Todo kullanıcı arayüzüdür.  
Kullanıcı kaydı, girişi, oturum yönetimi ve todo işlemleri içerir.

---

## Kullanılan Teknolojiler

- React.js
- Vite.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Fetch API
- react-toastify (bildirimler için)

---

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. `.env` dosyası oluşturun:

```env
VITE_API_BASE=https://todo-backend-9s5z.onrender.com/api
```

> Geliştirme ortamında `VITE_API_BASE=http://localhost:3001/api` kullanabilirsiniz.

3. Uygulamayı başlatın:

```bash
npm run dev
```

---

## Özellikler

- Kullanıcı kaydı ve girişi
- JWT ile güvenli oturum yönetimi
- Yetkisiz kullanıcılar için Private Route koruması
- Todos listesi ekleme, silme, düzenleme, tamamlandı durumu değiştirme
- Toast bildirimleri
- Tailwind ile responsive ve modern tasarım

---

## Notlar

- CORS hatası almamak için backend doğru yapılandırılmış olmalıdır.
- Vite.js proxy ayarı (`vite.config.js`) sayesinde local API çağrılarında sorun yaşanmaz.

---
