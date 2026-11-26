CREATE DATABASE IF NOT EXISTS db_review_buku;
USE db_review_buku;

CREATE TABLE buku(
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    penulis VARCHAR(255) NOT NULL,
    sampul_buku_url VARCHAR(500),
    rating DECIMAL(2,1) CHECK(rating>=0 AND rating<=5),
    status ENUM('ingin_dibaca','sedang_dibaca','selesai') DEFAULT 'selesai',
    kategori VARCHAR(100),
    ringkasan TEXT,
    review TEXT,
    kutipan_favorit TEXT,
    jumlah_halaman INT,
    selesai_pada DATE,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO buku(
    judul,penulis,sampul_buku_url,rating,status,kategori,ringkasan,review,kutipan_favorit,jumlah_halaman,selesai_pada
) values (
    'Bumi',
    'Tere Liye',
    'https://static.republika.co.id/uploads/member/images/news/230528231723-670.jpeg',
    4.5,
    'selesai',
    'Novel',
    'Keren',
    'Bagus',
    'Tidak tau',
    345,
    '2026-11-26'
), (
    'Atomic Habits',
    'James Clear',
    'https://static.republika.co.id/uploads/member/images/news/230528231723-670.jpeg',
    4.5,
    'selesai',
    'Self-improvement',
    'Bagus',
    'Bermanfaat',
    'Lihat saja sendiri',
    315,
    '2026-11-26'
),  (
    'Laskar Pelangi',
    'Andrea Hirata',
    'https://static.republika.co.id/uploads/member/images/news/230528231723-670.jpeg',
    4.5,
    'selesai',
    'Novel',
    'Begitulah',
    'Bagus dan menginspirasi',
    'Ceritanya panjang',
    535,
    '2026-11-26'
);