# Dokumentasi Penjelasan Kodingan dan SRS — MyTask

## 1. Gambaran umum
MyTask adalah aplikasi pengelola tugas kuliah sederhana yang dibangun dengan HTML5, CSS3, dan JavaScript tanpa framework. Aplikasi mempunyai halaman Beranda dan Tentang. Fitur utamanya meliputi CRUD tugas, status penyelesaian, pencarian, filter, statistik, penyimpanan lokal, serta dark mode.

## 2. Penjelasan HTML
### `index.html`
- `<!DOCTYPE html>` dan `<html lang="id">` mendeklarasikan dokumen HTML dan bahasa utama.
- `<meta charset>` dan `<meta name="viewport">` membantu karakter tampil benar dan layout menyesuaikan layar.
- `<nav>` berisi identitas MyTask, tautan Beranda/Tentang, dan tombol tema.
- `<main>` berisi konten utama halaman.
- `<section class="stats-grid">` menampilkan jumlah total, pending, dan selesai.
- `<form id="task-form">` menerima nama tugas, mata kuliah, dan deadline.
- `<button type="submit">` menjalankan proses penambahan atau penyimpanan edit tugas.
- `.filter-btn` dan `#search-task` menjadi kontrol filter serta pencarian.
- `#task-list` menjadi area yang diisi JavaScript melalui manipulasi DOM.
- `<dialog>` menyediakan konfirmasi sebelum penghapusan satu tugas.
- `#toast` menyampaikan pesan tindakan kepada pengguna.

### `about.html`
Halaman Tentang menjelaskan latar belakang, tujuan, fitur, teknologi, dan batasan aplikasi. Halaman ini memuat `1.js` yang sama, tetapi fungsi tugas memeriksa apakah form Beranda tersedia sebelum memasang event, sehingga halaman Tentang tidak gagal akibat elemen tugas yang tidak ada.

## 3. Penjelasan CSS — `dafo.css`
- **CSS custom properties** di `:root` menyimpan warna, radius, dan shadow agar konsisten.
- Selector `:root[data-theme="dark"]` mengubah nilai variabel saat tema gelap aktif.
- **Flexbox** dipakai untuk navigasi, toolbar, header, dan tombol aksi.
- **CSS Grid** dipakai untuk statistik, form, kartu informasi, dan kartu teknologi.
- **Media queries** pada breakpoint tablet/ponsel menyusun ulang kolom agar tidak meluber.
- State `:hover` dan `:focus-visible` memberikan umpan balik interaksi dan fokus keyboard.
- `prefers-reduced-motion` mengurangi transisi bagi pengguna yang memilih gerakan minimal.

## 4. Penjelasan JavaScript — `1.js`
- `DOMContentLoaded` memastikan elemen HTML tersedia sebelum event dipasang.
- `loadTasks()` membaca data JSON dari `localStorage` dan menangani data yang tidak dapat dibaca.
- `saveTasks()` menyimpan array tugas ke browser.
- `handleFormSubmit()` memvalidasi input, lalu menambah tugas baru atau memperbarui tugas yang dipilih.
- `renderTasks()` membangun tampilan daftar dari data, menerapkan filter/pencarian, dan memperbarui statistik.
- `escapeHTML()` mengamankan teks pengguna sebelum dimasukkan ke template HTML.
- Event `click` dan `change` digunakan untuk edit, hapus, serta ubah status selesai.
- `openDeleteDialog()` meminta konfirmasi sebelum tugas dihapus.
- `showToast()` menampilkan pesan sementara.
- `initTheme()` membaca tema tersimpan, mengubah atribut `data-theme` pada elemen HTML, dan menyimpan pilihan pengguna. Tema memakai kunci `mytask-theme`, terpisah dari data tugas.

## 5. Ringkasan SRS
**Tujuan:** memudahkan mahasiswa mencatat dan memantau tugas. **Pengguna:** mahasiswa. **Kebutuhan fungsional:** navigasi dua halaman, tambah/edit/hapus tugas, status selesai, statistik, pencarian, filter, konfirmasi, penyimpanan lokal, dan dark mode. **Kebutuhan nonfungsional:** responsif, mudah digunakan, fokus keyboard terlihat, kompatibel dengan browser modern, dan data tugas disimpan lokal.

Detail lengkap kebutuhan fungsional, nonfungsional, aturan validasi, batasan, dan kriteria penerimaan tersedia pada [SRS.md](SRS.md).

## 6. Skenario pengujian
Catat hasil aktual pada kolom terakhir setelah setiap skenario benar-benar diuji.

| No. | Skenario | Hasil yang diharapkan | Hasil aktual |
|---:|---|---|---|
| 1 | Buka `index.html` | Beranda dan statistik tampil tanpa error | Belum diuji |
| 2 | Buka halaman Tentang | Konten Tentang tampil tanpa error JavaScript | Belum diuji |
| 3 | Submit form kosong | Browser menolak input wajib | Belum diuji |
| 4 | Tambah tugas valid | Tugas tampil dan statistik diperbarui | Belum diuji |
| 5 | Tambah input berisi spasi saja | Tugas tidak disimpan | Belum diuji |
| 6 | Edit tugas | Perubahan tersimpan pada tugas yang tepat | Belum diuji |
| 7 | Centang status selesai | Status dan statistik berubah | Belum diuji |
| 8 | Cari kata kunci | Daftar menampilkan kecocokan | Belum diuji |
| 9 | Pilih filter Pending/Selesai | Hanya status yang sesuai ditampilkan | Belum diuji |
| 10 | Hapus satu tugas lalu batalkan | Tugas tetap ada jika pembatalan dipilih | Belum diuji |
| 11 | Reload setelah menambah tugas | Tugas masih tersimpan di browser | Belum diuji |
| 12 | Aktifkan dark mode lalu pindah halaman/reload | Tema gelap tetap terpilih di kedua halaman | Belum diuji |
| 13 | Hapus tugas selesai | Hanya tugas selesai yang dihapus setelah konfirmasi | Belum diuji |
| 14 | Buka di layar ponsel | Konten tidak meluber secara horizontal | Belum diuji |

## 7. Pemeriksaan validasi
- HTML Nu: https://validator.w3.org/nu/
- CSS Validator: https://jigsaw.w3.org/css-validator/

Tempel URL file yang dipublikasikan atau unggah file ke validator. Catat pesan error/warning dan perbaiki yang relevan. Dokumen ini tidak mengklaim hasil validator sudah lulus karena validasi harus dilakukan pada versi akhir yang dikumpulkan.

## 8. Catatan sebelum dikumpulkan
1. Isi identitas mahasiswa, NIM, kelas, dosen, dan mata kuliah jika diminta oleh format tugas.
2. Jalankan seluruh skenario pengujian dan ganti status “Belum diuji” sesuai hasil nyata.
3. Jalankan validator HTML/CSS.
4. Aktifkan GitHub Pages bila URL website diwajibkan dan salin URL aktual dari pengaturan repository.
5. Pastikan isi laporan sesuai kode final yang benar-benar diserahkan.
