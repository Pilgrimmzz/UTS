# MyTask — Student Task Manager

MyTask adalah website sederhana untuk membantu mahasiswa mencatat, mencari, memantau, dan mengelola tugas kuliah. Proyek ini dibuat untuk memenuhi tugas UTS Pemrograman Web dengan HTML, CSS, dan JavaScript murni.

## Fitur
- Dua halaman: **Beranda** dan **Tentang**, dengan navigasi antarhalaman.
- Menambah, mengedit, menghapus, dan menandai tugas sebagai selesai.
- Validasi input serta batas panjang nama tugas dan mata kuliah.
- Pencarian berdasarkan nama tugas atau mata kuliah.
- Filter semua tugas, pending, dan selesai.
- Ringkasan total tugas, tugas pending, dan tugas selesai.
- Konfirmasi sebelum penghapusan dan notifikasi hasil tindakan.
- Dark mode/light mode yang tersimpan di browser.
- Penyimpanan daftar tugas menggunakan `localStorage`.
- Layout responsif untuk layar desktop dan ponsel.

## Teknologi dan implementasi
- **HTML5**: struktur halaman semantik, navigasi, form, label, tombol, dialog konfirmasi, dan konten.
- **CSS3**: variabel CSS, Flexbox, Grid, media query, state hover/focus, dan variabel tema terang/gelap.
- **JavaScript**: event handling, manipulasi DOM, validasi form, pencarian/filter, perubahan status tugas, dialog, notifikasi, serta `localStorage`.

## Struktur file
```text
UTS/
├── index.html
├── about.html
├── dafo.css
├── 1.js
├── README.md
├── SRS.md
├── Dokumentasi_Kodingan_dan_SRS.md
└── FOTO/
    ├── AOIN.jpeg
    ├── CANDI.jpeg
    └── DAFOjpeg

## Cara menjalankan
1. Unduh ZIP repository atau clone repository ini.
2. Pastikan seluruh file di atas berada dalam folder yang sama.
3. Buka `index.html` dengan browser modern. Untuk pengembangan, file juga dapat dibuka melalui ekstensi Live Server di Visual Studio Code.
4. Pilih **Beranda** untuk mengelola tugas dan **Tentang** untuk membaca penjelasan proyek.

Website tidak membutuhkan instalasi package atau server backend. Google Fonts membutuhkan koneksi internet; jika tidak tersedia, browser menggunakan font sans-serif pengganti.

## Cara menggunakan
1. Isi nama tugas, mata kuliah, dan deadline, lalu tekan **Tambah Tugas**.
2. Gunakan **Edit** untuk memperbarui tugas dan **Hapus** untuk menghapusnya.
3. Centang kotak pada tugas untuk mengubah status selesai.
4. Gunakan filter dan kolom pencarian untuk menemukan tugas.
5. Tekan **Hapus tugas selesai** untuk membersihkan tugas yang sudah diselesaikan.
6. Tekan tombol **Dark Mode/Light Mode** untuk mengganti tema. Tema tersimpan di browser.

## Penyimpanan dan batasan
- Data tugas disimpan pada `localStorage` browser dengan kunci `mytask-tasks`; tema disimpan dengan kunci `mytask-theme`.
- Data hanya tersedia di browser dan perangkat yang sama. Aplikasi belum memiliki login, sinkronisasi online, atau database server.
- Menghapus data situs/browser dapat menghapus tugas yang tersimpan.

## Dokumentasi dan SRS
- [Software Requirements Specification (SRS)](SRS.md)
- [Dokumentasi Penjelasan Kodingan dan Pengujian](Dokumentasi_Kodingan_dan_SRS.md)

## Validasi sebelum pengumpulan
- HTML: https://validator.w3.org/nu/
- CSS: https://jigsaw.w3.org/css-validator/
- Uji semua skenario pada bagian pengujian di `Dokumentasi_Kodingan_dan_SRS.md`.

Catat hasil validasi dan pengujian yang benar-benar dilakukan. Jangan menyatakan valid 100% sebelum menjalankan validator pada versi final.

## Deployment GitHub Pages
Buka repository GitHub → **Settings → Pages** → pilih branch `main` dan folder `/ (root)` → **Save**. Setelah GitHub Pages menyediakan alamat situs, salin URL yang muncul ke sini untuk keperluan pengumpulan:

**URL website:** _isi dengan URL GitHub Pages yang benar-benar ditampilkan GitHub._

## Identitas dan penilaian
Lengkapi identitas mahasiswa, kelas, dosen, dan mata kuliah sesuai format yang diminta dosen sebelum pengumpulan. Jika rubrik yang dibagikan berjumlah 120 poin, konfirmasikan ke dosen apakah total tersebut memang 120 atau perlu dikonversi.
