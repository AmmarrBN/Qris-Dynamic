# 🚀 QRIS Dynamic Generator

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/yukis-projects-11c0a24b/v0-dynamic-qris-generator)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/B1dAckC44gC)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Heroku Deploy](https://img.shields.io/badge/Deployed%20on-Heroku-430098?style=for-the-badge&logo=heroku)](https://heroku.com)

Aplikasi web modern untuk mengonversi **QRIS statis menjadi QRIS dinamis** dengan nominal pembayaran yang dapat disesuaikan.  
Dilengkapi dengan dark/light mode, animasi smooth, dan logo branding otomatis pada QR code.

![QRIS Dynamic Generator Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=QRIS+Dynamic+Generator)

---

## 📋 Daftar Isi

- [🎯 Apa itu QRIS Dynamic?](#-apa-itu-qris-dynamic)
- [✨ Fitur Utama](#-fitur-utama)
- [💡 Manfaat](#-manfaat)
- [🛠️ Teknologi](#-teknologi)
- [📦 Instalasi Lokal](#-instalasi-lokal)
- [🚀 Deploy ke Vercel](#-deploy-ke-vercel)
- [🌐 Deploy ke Heroku](#-deploy-ke-heroku)
- [🧠 Penjelasan Code Utama](#-penjelasan-code-utama)
- [📖 Cara Penggunaan](#-cara-penggunaan)
- [🤝 Kontribusi](#-kontribusi)
- [📝 Lisensi](#-lisensi)
- [👨‍💻 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)

---

## 🎯 Apa itu QRIS Dynamic?

**QRIS (Quick Response Code Indonesian Standard)** adalah standar QR code untuk pembayaran digital di Indonesia.

- **QRIS Statis:** pelanggan harus mengetik nominal manual  
- **QRIS Dinamis:** nominal sudah tertanam di dalam QR  

Aplikasi ini:
1. Membaca QRIS statis  
2. Menambahkan tag nominal (54)  
3. Menghitung ulang CRC16 checksum  
4. Menghasilkan QR code baru dengan logo  

---

## ✨ Fitur Utama

- 🖼️ Upload QRIS / input manual  
- 💰 Input nominal otomatis format Rupiah  
- 🧾 Generate QR Code dengan logo  
- 🌗 Dark/Light Mode  
- 🎨 Animated Gradient Background  
- ⬇️ Download hasil QR  
- 📋 Copy QRIS string  
- 📱 Fully Responsive  
- 💎 Modern Glass UI  

---

## 💡 Manfaat

| Kelebihan | Deskripsi |
|------------|------------|
| ⚡ Cepat | Generate QRIS dalam detik |
| ✅ Akurat | Nominal otomatis |
| 💼 Profesional | QR dengan logo brand |
| 🧠 Modern | UI/UX elegan |
| 💸 Gratis | 100% open source |

---

## 🛠️ Teknologi

| Stack | Versi |
|-------|--------|
| Next.js | 15.2.4 |
| React | 19 |
| TypeScript | 5.0.2 |
| Tailwind CSS | v4 |
| shadcn/ui | Latest |
| qrcode | Latest |
| Lucide React | Latest |

---

<details>
<summary>📦 <b>Instalasi Lokal (klik untuk membuka)</b></summary>

### Prerequisites
- Node.js 18+ atau 20+
- npm / yarn / pnpm

### Langkah-langkah
```bash
git clone https://github.com/Hoshiyuki-Api/v0-dynamic-qris-generator.git
cd v0-dynamic-qris-generator

# install dependencies
npm install

# jalankan di mode development
npm run dev
````

Akses di browser:

```
http://localhost:3000
```

</details>

---

<details>
<summary>🚀 <b>Deploy ke Vercel</b></summary>

### Metode 1: via GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

1. Masuk ke [vercel.com](https://vercel.com)
2. Import repo `v0-dynamic-qris-generator`
3. Klik **Deploy**
4. Selesai 🎉

### Metode 2: via CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

</details>

---

<details>
<summary>🌐 <b>Deploy ke Heroku</b></summary>

### Langkah

```bash
heroku login
heroku create your-app-name
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
    "start": "next start -p $PORT"
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

</details>

---

<details>
<summary>🧠 <b>Penjelasan Code Utama</b></summary>

### 🔹 CRC16 Checksum

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
```

### 🔹 Tambah Nominal ke QRIS

```typescript
const modifyQris = (staticQris: string, nominal: number): string => {
  let qrisWithoutCrc = staticQris.slice(0, -4);
  const nominalStr = nominal.toFixed(2);
  const tag54 = `54${nominalStr.length.toString().padStart(2, '0')}${nominalStr}`;
  const newCrc = crc16(qrisWithoutCrc + '6304');
  return qrisWithoutCrc + '6304' + newCrc;
};
```

### 🔹 Generate QR Code dengan Logo

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

### 🔹 Toggle Tema

```typescript
const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

</details>

---

<details>
<summary>📖 <b>Cara Penggunaan</b></summary>

1. Upload QRIS statis
2. Masukkan nominal
3. Klik **Generate QRIS Dinamis**
4. Download QR / copy string
5. (Opsional) ubah tema dark/light

</details>

---

<details>
<summary>🤝 <b>Kontribusi</b></summary>

### Cara berkontribusi

```bash
git checkout -b feature/AmazingFeature
git commit -m "Add AmazingFeature"
git push origin feature/AmazingFeature
```

Buat pull request di GitHub ✅

**Ide kontribusi:**

* Batch QR generator
* Export SVG/PDF
* API endpoint
* Save QR history

</details>

---

## 📝 Lisensi

Project ini berlisensi di bawah **MIT License** — lihat file `LICENSE` untuk detailnya.

---

## 👨‍💻 Author

**AmmarBN**
🔗 GitHub: [@AmmarrBN](https://github.com/AmmarrBN)
🌐 Website: [https://yuki-host.my.id](https://yuki-host.my.id)

---

## 🙏 Acknowledgments

* [v0.app](https://v0.app)
* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [Vercel](https://vercel.com/)

---

## 📞 Support

📧 Email: [[your-email@example.com](mailto:your-email@example.com)]
🐞 Open issue di GitHub jika menemukan bug

---

⭐ **Kasih star kalau project ini bermanfaat ya!**
Dibuat dengan ❤️ oleh [AmmarBN](https://github.com/AmmarrBN)

```

---

Apakah kamu mau saya tambahkan satu **dropdown tambahan “🧰 API Documentation”** (buat endpoint QRIS Generator REST API kalau nanti kamu tambah backend)?
```
