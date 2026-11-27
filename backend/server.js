const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const bukuRoutes = require('./routes/bukuRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API Review Buku berjalan' });
});

app.use('/api/buku', bukuRoutes);

// Cek koneksi database lalu jalankan server
db.getConnection()
    .then((connection) => {
        console.log('Terhubung ke database MySQL');
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        const target = `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`;
        console.error(`Gagal terhubung ke database (${target}):`, err.code || err.message || err);
        process.exit(1);
    });
