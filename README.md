# 🚀 QRIS Dynamic Generator

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/yukis-projects-11c0a24b/v0-dynamic-qris-generator)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/B1dAckC44gC)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Aplikasi web modern untuk mengonversi **QRIS statis menjadi QRIS dinamis** dengan nominal pembayaran yang dapat disesuaikan.  
Dilengkapi dengan dark/light mode, animasi smooth, dan logo branding otomatis pada QR code.

![QRIS Dynamic Generator Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=QRIS+Dynamic+Generator)

---

## 📋 Daftar Isi

- [Apa itu QRIS Dynamic?](#-apa-itu-qris-dynamic)
- [Fitur Utama](#-fitur-utama)
- [Kegunaan](#-kegunaan)
- [Manfaat](#-manfaat)
- [Teknologi](#-teknologi)
- [Penjelasan Code Utama](#-penjelasan-code-utama)
- [Instalasi Lokal](#-instalasi-lokal)
- [Deploy ke Vercel](#-deploy-ke-vercel)
- [Deploy ke Heroku](#-deploy-ke-heroku)
- [Cara Penggunaan](#-cara-penggunaan)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Apa itu QRIS Dynamic?

**QRIS (Quick Response Code Indonesian Standard)** adalah standar QR code untuk pembayaran digital di Indonesia.

**QRIS Statis:** QR code tanpa nominal tetap — pelanggan harus memasukkan jumlah manual.  
**QRIS Dinamis:** QR code dengan nominal tetap — pelanggan cukup scan & bayar.

Aplikasi ini mengubah QRIS statis menjadi dinamis dengan langkah:
1. Membaca data QRIS statis  
2. Menambahkan informasi nominal (tag 54)  
3. Menghitung ulang CRC16 checksum  
4. Membuat ulang QR code dengan logo branding

---

## ✨ Fitur Utama

- 🖼️ **Upload QRIS Image** (atau input manual)
- 💰 **Input Nominal Dinamis** (auto-format Rupiah)
- 🧾 **QR Code dengan Logo**
- 🌗 **Dark/Light Mode**
- 🌈 **Animated Background**
- ⬇️ **Download QR Code (PNG)**
- 📋 **Copy QRIS String**
- 📱 **Responsive Design**
- 💎 **Modern UI/UX (Glassmorphism & Gradient)**

---

## 💡 Manfaat

- ⚡ **Efisiensi waktu:** generate QRIS dinamis dalam hitungan detik  
- ✅ **Mengurangi error:** nominal sudah ditentukan  
- 🧠 **Profesional:** QR code dengan logo brand  
- 🎨 **UX modern:** smooth transitions & theme toggle  
- 💸 **Gratis & Open Source**  
- 🔧 **Fleksibel:** untuk berbagai skenario pembayaran  

---

## 🛠️ Teknologi

- **Next.js 15.2.4**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **qrcode**
- **Lucide React**
- **Geist Font (Vercel)**

---

## 🔍 Penjelasan Code Utama

### 1. CRC16 Calculation
```typescript
function crc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
````

### 2. QRIS Dynamic Conversion

```typescript
const modifyQris = (staticQris: string, nominal: number): string => {
  let qrisWithoutCrc = staticQris.slice(0, -4);
  const nominalStr = nominal.toFixed(2);
  const tag54 = `54${nominalStr.length.toString().padStart(2, '0')}${nominalStr}`;
  const newCrc = crc16(qrisWithoutCrc + '6304');
  return qrisWithoutCrc + '6304' + newCrc;
};
```

### 3. QR Code Generation with Logo

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !qrisString) return;

  QRCode.toCanvas(canvas, qrisString, {
    width: 300,
    margin: 2,
    errorCorrectionLevel: 'H'
  });

  const ctx = canvas.getContext('2d');
  const logo = new Image();
  logo.crossOrigin = 'anonymous';
  logo.src = '/yuki-host-logo.png';

  logo.onload = () => {
    const logoSize = 100;
    const x = (canvas.width - logoSize) / 2;
    const y = (canvas.height - logoSize) / 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
    ctx.drawImage(logo, x, y, logoSize, logoSize);
  };
}, [qrisString]);
```

### 4. Theme Toggle

```typescript
const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

---

## 📦 Instalasi Lokal

### Prerequisites

* Node.js 18+ atau 20+
* npm / yarn / pnpm

### Langkah

```bash
# Clone repository
git clone https://github.com/Hoshiyuki-Api/v0-dynamic-qris-generator.git
cd v0-dynamic-qris-generator

# Install dependencies
npm install
# atau
yarn install
# atau
pnpm install

# Jalankan dev server
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka di browser:

```
http://localhost:3000
```

---

## 🚀 Deploy ke Vercel

### 🔹 Method 1: Deploy via GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

1. Buka [vercel.com](https://vercel.com)
2. Import repo `v0-dynamic-qris-generator`
3. Klik **Deploy**
4. Aplikasi live di `https://your-app.vercel.app`

### 🔹 Method 2: Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

---

## 🌐 Deploy ke Heroku

### Langkah

```bash
# Login
heroku login

# Create app
heroku create your-app-name

# Set buildpack
heroku buildpacks:set heroku/nodejs
```

**Procfile**

```
web: npm start
```

**package.json**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT",
    "lint": "next lint"
  }
}
```

**Deploy**

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
heroku open
```

---

## 📖 Cara Penggunaan

1. Upload QRIS statis
2. Input nominal pembayaran
3. Klik **Generate QRIS Dinamis**
4. Download atau copy hasil QR code
5. (Opsional) Toggle dark/light mode

---

## 🤝 Kontribusi

```bash
# Fork repo
git checkout -b feature/AmazingFeature
git commit -m "Add AmazingFeature"
git push origin feature/AmazingFeature
```

Lalu buat **Pull Request**.

💡 Ide kontribusi:

* Batch generation
* Export QR ke SVG/PDF
* Saved QR history
* API integration

---

## 📝 Lisensi

Distributed under the **MIT License**.
Lihat file `LICENSE` untuk detail.

---

## 👨‍💻 Author

**AmmarBN**
🔗 GitHub: [@AmmarrBN](https://github.com/AmmarrBN)

---

## 🙏 Acknowledgments

* [v0.app](https://v0.app)
* [Next.js](https://nextjs.org/)
* [Vercel](https://vercel.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [Tailwind CSS](https://tailwindcss.com/)

---

## 📞 Support

📧 Email: [[your-email@example.com](mailto:your-email@example.com)]
🐞 Open issue di GitHub jika ada bug atau pertanyaan.

---

⭐ **Jangan lupa kasih star di GitHub kalau project ini membantu!**
Made with ❤️ by [AmmarBN](https://github.com/AmmarrBN)

```

---

Apakah kamu mau saya bantu **tambahkan badge MIT License & status deploy Heroku** juga di atas biar README-nya makin profesional?
```
