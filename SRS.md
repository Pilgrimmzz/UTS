# Software Requirements Specification (SRS) — MyTask

## 1. Pendahuluan
### 1.1 Tujuan dokumen
Dokumen ini menjelaskan kebutuhan, batasan, fungsi, dan pengujian aplikasi MyTask sebagai dokumentasi proyek UTS Pemrograman Web.

### 1.2 Tujuan produk
MyTask membantu mahasiswa mencatat tugas kuliah, menyimpan deadline, memantau status penyelesaian, serta menemukan tugas melalui pencarian dan filter.

### 1.3 Ruang lingkup
Aplikasi berupa website sisi-klien dengan dua halaman: Beranda untuk mengelola tugas dan Tentang untuk menjelaskan proyek. Tidak ada autentikasi, API, backend, atau database online.

## 2. Pengguna dan lingkungan operasi
- **Pengguna sasaran:** mahasiswa yang ingin mengelola daftar tugas kuliah secara mandiri.
- **Lingkungan:** browser modern pada desktop atau ponsel.
- **Teknologi:** HTML5, CSS3, JavaScript, dan Web Storage API (`localStorage`).

## 3. Kebutuhan fungsional
| ID | Kebutuhan |
|---|---|
| FR-01 | Sistem menampilkan halaman Beranda dan Tentang serta menyediakan navigasi antarhalaman. |
| FR-02 | Pengguna dapat menambahkan tugas berisi nama, mata kuliah, dan deadline. |
| FR-03 | Sistem menolak pengiriman form jika kolom wajib belum diisi atau hanya berisi spasi. |
| FR-04 | Pengguna dapat mengedit informasi tugas yang sudah ada. |
| FR-05 | Pengguna dapat menghapus satu tugas dengan konfirmasi. |
| FR-06 | Pengguna dapat mengubah status tugas menjadi selesai atau belum selesai. |
| FR-07 | Sistem menampilkan statistik jumlah total, pending, dan selesai. |
| FR-08 | Pengguna dapat mencari tugas berdasarkan nama tugas atau mata kuliah. |
| FR-09 | Pengguna dapat memfilter tugas berdasarkan semua, pending, atau selesai. |
| FR-10 | Pengguna dapat menghapus semua tugas yang selesai setelah konfirmasi. |
| FR-11 | Sistem menyimpan data tugas di `localStorage` dan memuatnya kembali saat halaman dibuka. |
| FR-12 | Pengguna dapat berganti tema terang/gelap pada kedua halaman; pilihan tema disimpan di `localStorage`. |
| FR-13 | Sistem memberi umpan balik singkat setelah tindakan utama. |

## 4. Kebutuhan nonfungsional
- **NFR-01 — Usability:** label form dan tombol memakai istilah yang jelas.
- **NFR-02 — Responsif:** layout menyesuaikan lebar layar desktop dan ponsel.
- **NFR-03 — Aksesibilitas dasar:** elemen form memiliki label, tombol memiliki nama yang dapat dibaca, dan fokus keyboard terlihat.
- **NFR-04 — Kompatibilitas:** menggunakan fitur web standar pada browser modern.
- **NFR-05 — Privasi:** data tugas disimpan lokal di browser; tidak dikirim ke server oleh aplikasi ini.
- **NFR-06 — Ketahanan:** kegagalan membaca atau menyimpan localStorage ditangani agar tidak langsung menghentikan seluruh antarmuka.

## 5. Aturan data dan validasi
- Nama tugas wajib diisi dan maksimal 100 karakter.
- Nama mata kuliah wajib diisi dan maksimal 80 karakter.
- Deadline wajib diisi menggunakan input tanggal.
- Spasi di awal/akhir input dipangkas.
- Status tugas berupa boolean `completed`.
- Setiap tugas memiliki ID unik yang digunakan untuk edit, hapus, dan ubah status.

## 6. Antarmuka dan navigasi
- **Beranda (`index.html`):** formulir tugas, statistik, pencarian, filter, daftar tugas, dan kontrol penghapusan.
- **Tentang (`about.html`):** latar belakang, tujuan, fitur, teknologi, dan batasan aplikasi.
- **Tema:** tombol di navigasi tersedia pada kedua halaman.

## 7. Penyimpanan
- `mytask-tasks`: array objek tugas dalam format JSON.
- `mytask-theme`: string `light` atau `dark`.
- Penyimpanan tidak disinkronkan lintas browser atau perangkat. Penghapusan data browser dapat menghapus data aplikasi.

## 8. Batasan dan asumsi
- Aplikasi tidak memiliki login dan tidak memisahkan data antar pengguna komputer.
- Tidak ada pengingat deadline otomatis, sinkronisasi cloud, atau kolaborasi.
- Format tanggal mengikuti locale Indonesia pada tampilan.
- Pengguna memakai browser dengan JavaScript dan localStorage aktif.

## 9. Kriteria penerimaan
Aplikasi dapat diterima apabila halaman dapat dinavigasi, fungsi CRUD tugas bekerja, validasi wajib berjalan, pencarian/filter dan statistik sesuai data, tugas dan tema bertahan setelah reload, serta tampilan dapat digunakan pada desktop dan ponsel. Hasil validasi HTML/CSS dan pengujian harus dicatat setelah benar-benar dijalankan.

## 10. Dokumentasi Kegiatan





