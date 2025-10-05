# QRIS Dynamic Generator 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Aplikasi web modern untuk mengkonversi QRIS statis menjadi QRIS dinamis dengan nominal pembayaran yang dapat disesuaikan. Dilengkapi dengan dark/light mode, animasi smooth, dan logo branding otomatis pada QR code.

<p align="center">
  <a href="https://qris.ammarbn.my.id">
    <img src="https://raw.githubusercontent.com/AmmarrBN/Qris-Dynamic/refs/heads/main/public/yuki-host-logo.png" 
         alt="QRIS Dynamic Generator Preview" 
         width="70%" />
  </a>
</p>

## 📋 Daftar Isi

- [Apa itu QRIS Dynamic?](#-apa-itu-qris-dynamic)
- [Fitur Utama](#-fitur-utama)
- [Kegunaan](#-kegunaan)
- [Manfaat](#-manfaat)
- [Teknologi](#%EF%B8%8F-teknologi)
- [Penjelasan Code Utama](#-penjelasan-code-utama)
- [Instalasi Lokal](#-instalasi-lokal)
- [Deploy ke Vercel](#-deploy-ke-vercel)
- [Deploy ke Heroku](#-deploy-ke-heroku)
- [Cara Penggunaan](#-cara-penggunaan)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## 🎯 Apa itu QRIS Dynamic?

**QRIS (Quick Response Code Indonesian Standard)** adalah standar QR code untuk pembayaran digital di Indonesia yang menggabungkan berbagai metode pembayaran dalam satu QR code.

**QRIS Statis** adalah QR code dengan nominal yang tidak ditentukan - pelanggan harus memasukkan nominal pembayaran secara manual.

**QRIS Dinamis** adalah QR code yang sudah memiliki nominal pembayaran yang ditentukan - pelanggan tinggal scan dan konfirmasi pembayaran tanpa perlu input nominal.

Aplikasi ini mengkonversi QRIS statis menjadi dinamis dengan cara:
1. Membaca data dari QRIS statis
2. Menambahkan informasi nominal pembayaran (tag 54)
3. Menghitung ulang CRC16 checksum
4. Generate QR code baru dengan logo branding

## ✨ Fitur Utama

- **Upload QRIS Image** - Upload gambar QR code statis atau paste kode QRIS secara manual
- **Input Nominal Dinamis** - Masukkan nominal pembayaran dalam format Rupiah dengan auto-formatting
- **QR Code dengan Logo** - Setiap QR code yang dihasilkan menyertakan logo Yuki Host di tengahnya
- **Dark/Light Mode** - Toggle tema gelap/terang dengan transisi smooth
- **Animated Background** - Floating shapes dengan animasi yang modern dan smooth
- **Download QR Code** - Download QR code sebagai file PNG
- **Copy QRIS String** - Copy kode QRIS untuk digunakan di platform lain
- **Responsive Design** - Tampilan optimal di semua ukuran layar
- **Modern UI/UX** - Glassmorphism effects, gradient animations, dan smooth transitions

## 🎨 Kegunaan

### Untuk Merchant/Bisnis
- Generate QR code pembayaran dengan nominal spesifik untuk setiap transaksi
- Buat invoice digital dengan QR code yang sudah include nominal
- Terima pembayaran dengan lebih cepat tanpa perlu pelanggan input nominal manual

### Untuk Freelancer
- Buat QR code untuk invoice project dengan nominal yang sudah ditentukan
- Kirim QR code pembayaran langsung ke klien via WhatsApp/Email

### Untuk Event Organizer
- Generate QR code untuk tiket dengan harga berbeda-beda
- Buat QR code untuk pembayaran booth atau sponsorship

### Untuk Donasi/Fundraising
- Buat QR code dengan nominal donasi yang disarankan
- Generate multiple QR codes untuk berbagai tier donasi

## 💡 Manfaat

### Efisiensi Waktu
Tidak perlu login ke dashboard bank atau payment gateway untuk membuat QRIS dinamis. Cukup buka aplikasi, input nominal, dan QR code siap digunakan dalam hitungan detik.

### Mengurangi Error
Dengan nominal yang sudah ditentukan, mengurangi risiko kesalahan input nominal oleh pelanggan.

### Profesional
QR code dengan logo branding memberikan kesan profesional dan meningkatkan brand awareness.

### User Experience
Interface modern dengan dark/light mode dan animasi smooth membuat pengalaman pengguna lebih menyenangkan.

### Gratis & Open Source
Tidak ada biaya berlangganan atau batasan penggunaan. Source code tersedia untuk dipelajari dan dikembangkan.

### Fleksibel
Dapat digunakan untuk berbagai skenario pembayaran dengan nominal yang berbeda-beda.

## 🛠️ Teknologi

Aplikasi ini dibangun menggunakan teknologi modern:

- **Next.js 15.2.4** - React framework untuk production
- **React 19** - Library UI terbaru
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **qrcode** - QR code generation library
- **Geist Font** - Modern font dari Vercel
- **Lucide React** - Beautiful icon library

## 🔍 Penjelasan Code Utama

### 1. CRC16 Calculation (`components/qris-generator.tsx`)

```typescript
function crc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  crc = crc & 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}
```

**Fungsi:** Menghitung checksum CRC16-CCITT untuk validasi data QRIS.

**Cara Kerja:**
- Inisialisasi CRC dengan nilai 0xFFFF
- Untuk setiap karakter dalam data, XOR dengan CRC yang di-shift 8 bit
- Lakukan 8 iterasi bit manipulation dengan polynomial 0x1021
- Return hasil dalam format hexadecimal 4 digit

### 2. QRIS Dynamic Conversion (`components/qris-generator.tsx`)

```typescript
const modifyQris = (staticQris: string, nominal: number): string => {
  // Remove existing CRC (last 4 characters)
  let qrisWithoutCrc = staticQris.slice(0, -4);
  
  // Format nominal as string with 2 decimal places
  const nominalStr = nominal.toFixed(2);
  
  // Create tag 54 (Transaction Amount)
  const tag54 = `54${nominalStr.length.toString().padStart(2, '0')}${nominalStr}`;
  
  // Insert or replace tag 54 in QRIS string
  // ... (logic to find and replace tag 54)
  
  // Calculate new CRC16
  const newCrc = crc16(qrisWithoutCrc + '6304');
  
  // Return complete QRIS with new CRC
  return qrisWithoutCrc + '6304' + newCrc;
};
```

**Fungsi:** Mengkonversi QRIS statis menjadi dinamis dengan menambahkan nominal.

**Cara Kerja:**
1. Hapus CRC lama (4 karakter terakhir)
2. Format nominal menjadi string dengan 2 desimal
3. Buat tag 54 (Transaction Amount) dengan format: `54[length][nominal]`
4. Insert/replace tag 54 di string QRIS
5. Hitung CRC16 baru untuk data yang sudah dimodifikasi
6. Gabungkan semua komponen menjadi QRIS dinamis yang valid

### 3. QR Code Generation with Logo (`components/qr-code-display.tsx`)

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || !qrisString) return;

  // Generate QR code to canvas
  QRCode.toCanvas(canvas, qrisString, { 
    width: 300, 
    margin: 2,
    errorCorrectionLevel: 'H' // High error correction for logo overlay
  });

  // Draw logo in center
  const ctx = canvas.getContext('2d');
  const logo = new Image();
  logo.crossOrigin = 'anonymous';
  logo.src = '/yuki-host-logo.png';
  
  logo.onload = () => {
    const logoSize = 100;
    const x = (canvas.width - logoSize) / 2;
    const y = (canvas.height - logoSize) / 2;
    
    // Draw white background for logo
    ctx.fillStyle = 'white';
    ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
    
    // Draw logo
    ctx.drawImage(logo, x, y, logoSize, logoSize);
  };
}, [qrisString]);
```

**Fungsi:** Generate QR code dengan logo di tengahnya.

**Cara Kerja:**
1. Generate QR code ke canvas dengan error correction level 'H' (30% recovery)
2. Load logo image dengan CORS handling
3. Gambar background putih di tengah QR code
4. Overlay logo di atas background putih
5. Error correction level tinggi memastikan QR code tetap scannable meskipun ada logo

### 4. Theme Toggle (`components/theme-toggle.tsx`)

```typescript
const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
};
```

**Fungsi:** Toggle antara dark mode dan light mode.

**Cara Kerja:**
1. Toggle state theme antara 'dark' dan 'light'
2. Simpan preferensi ke localStorage untuk persistence
3. Toggle class 'dark' pada element HTML untuk trigger CSS variables
4. CSS variables di `globals.css` otomatis berubah sesuai class

## 📦 Instalasi Lokal

### Prerequisites
- Node.js 18+ atau 20+
- npm, yarn, atau pnpm

### Langkah-langkah

1. **Clone repository**
```bash
git clone https://github.com/Hoshiyuki-Api/v0-dynamic-qris-generator.git
cd v0-dynamic-qris-generator
```

2. **Install dependencies**
```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

3. **Jalankan development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Buka browser**
```
http://localhost:3000
```

## 🚀 Deploy ke Vercel

Vercel adalah platform deployment yang paling mudah untuk Next.js (dibuat oleh creator Next.js).

### Method 1: Deploy via GitHub (Recommended)

1. **Push code ke GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub account
   - Click "Add New Project"
   - Import repository `v0-dynamic-qris-generator`
   - Click "Deploy"

3. **Konfigurasi (Optional)**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Tunggu proses build selesai (2-3 menit)
   - Aplikasi akan live di `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login ke Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy ke Production**
```bash
vercel --prod
```

### Auto-Deploy
Setiap push ke branch `main` akan otomatis trigger deployment baru di Vercel.

## 🌐 Deploy ke Heroku

Heroku adalah platform cloud yang mendukung berbagai bahasa pemrograman.

### Prerequisites
- Heroku account (gratis di [heroku.com](https://heroku.com))
- Heroku CLI installed

### Langkah-langkah

1. **Install Heroku CLI**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download installer dari https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login ke Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-app-name
# atau biarkan Heroku generate nama random
heroku create
```

4. **Set Buildpack**
```bash
heroku buildpacks:set heroku/nodejs
```

5. **Configure Environment**

Pastikan `package.json` memiliki scripts yang benar:
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

Pastikan ada file `Procfile` di root directory:
```
web: npm start
```

6. **Deploy ke Heroku**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

7. **Open App**
```bash
heroku open
```

### Troubleshooting Heroku

**Error: Cannot find module '@tailwindcss/postcss'**
- Pastikan `@tailwindcss/postcss` ada di `devDependencies` di `package.json`

**Error: Application error**
- Check logs: `heroku logs --tail`
- Pastikan PORT environment variable digunakan: `next start -p $PORT`

**Build timeout**
- Upgrade ke Heroku paid plan untuk build time lebih lama
- Atau optimize dependencies

### Environment Variables (Optional)

Jika aplikasi memerlukan environment variables:

```bash
heroku config:set VARIABLE_NAME=value
```

## 📖 Cara Penggunaan

1. **Upload QRIS Statis**
   - Click area upload atau drag & drop gambar QR code statis
   - Atau paste kode QRIS secara manual di text area

2. **Input Nominal**
   - Masukkan nominal pembayaran (contoh: 50000)
   - Format otomatis menjadi Rupiah (Rp 50.000)

3. **Generate QR Code**
   - Click tombol "Generate QRIS Dinamis"
   - QR code baru akan muncul dengan logo di tengahnya

4. **Download atau Copy**
   - Click "Download QR Code" untuk save sebagai PNG
   - Click "Copy QRIS String" untuk copy kode QRIS

5. **Toggle Theme (Optional)**
   - Click icon sun/moon di pojok kanan atas untuk switch dark/light mode

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork repository ini
2. Create branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Ideas untuk Kontribusi
- Tambah support untuk multiple payment methods
- Implementasi history/saved QR codes
- Export QR code dalam berbagai format (SVG, PDF)
- Batch generation untuk multiple QR codes
- API endpoint untuk integration dengan sistem lain

## 📝 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**AmmarBN**
- GitHub: [@AmmarrBN](https://github.com/AmmarrBN)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Heroku](https://heroku.com/) - Deployment platform
- [Vercel](https://vercel.com/) - Deployment platform
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

Jika ada pertanyaan atau issue, silakan:
- Open issue di GitHub
- Contact via email: [ammarburhanudinafis.com]

---

**⭐ Jika project ini membantu, jangan lupa kasih star di GitHub!**

Made with ❤️ by [AmmarBN](https://github.com/AmmarrBN)



