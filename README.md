# Todo Frontend

Bu proje, React ve Redux Toolkit (RTK Query) kullanılarak oluşturulmuş bir Todo uygulamasının frontend kısmıdır. Kullanıcı kimlik doğrulaması, todo işlemleri (ekleme, silme, güncelleme) ve verilerin RTK Query ile önbelleğe alınması gibi işlevleri içerir.

## Özellikler

- React ile modern kullanıcı arayüzü
- Redux Toolkit + RTK Query ile global state yönetimi ve veri önbellekleme
- JWT tabanlı oturum yönetimi
- Form verisi işleme ve kullanıcı doğrulama
- Kullanıcı giriş/çıkış işlemleri
- Todo ekleme, silme, güncelleme, tamamlandı durumunu değiştirme

## Kurulum

```bash
git clone https://github.com/EmirhanG7/todo-frontend.git
cd todo-frontend
npm install
```

## Çalıştırma

```bash
npm run dev
```

> `.env` dosyasında `VITE_API_BASE` değişkeni backend API adresine ayarlanmalıdır:
```
VITE_API_BASE=https://todo-backend-xxxxx.onrender.com/api
```

## Kullanılan Teknolojiler

- React
- Redux Toolkit
- RTK Query
- Tailwind CSS
- React Router DOM
- Toastify

---

**Backend:** [todo-backend GitHub Reposu](https://github.com/EmirhanG7/todo-backend)