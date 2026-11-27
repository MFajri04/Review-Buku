const db = require('../db');

const toNullable = (val) => (val === undefined || val === '' ? null : val);

// CREATE - tambah review buku
exports.createBuku = async (req, res) => {
    try {
        const {
            judul, penulis, sampul_buku_url, rating,
            status, kategori, ringkasan, review,
            kutipan_favorit, jumlah_halaman, selesai_pada
        } = req.body;

        if (!judul || !penulis) {
            return res.status(400).json({ error: 'Judul dan penulis wajib diisi' });
        }

        const [result] = await db.query(
            `INSERT INTO buku (judul, penulis, sampul_buku_url, rating, status, kategori, ringkasan, review, kutipan_favorit, jumlah_halaman, selesai_pada)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                judul,
                penulis,
                toNullable(sampul_buku_url),
                toNullable(rating),
                status || 'selesai',
                toNullable(kategori),
                toNullable(ringkasan),
                toNullable(review),
                toNullable(kutipan_favorit),
                toNullable(jumlah_halaman),
                toNullable(selesai_pada)
            ]
        );

        res.status(201).json({
            message: 'Review buku berhasil ditambahkan',
            id: result.insertId
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ - fungsi untuk menampilkan semua review
exports.getAllBuku = async (req, res) => {
    try {
        const { search, status, kategori } = req.query;
        const keyword = search ? `%${search}%` : null;

        const [results] = await db.query(
            `SELECT * FROM buku 
             WHERE (? IS NULL OR judul LIKE ? OR penulis LIKE ?) 
               AND (? IS NULL OR status = ?) 
               AND (? IS NULL OR kategori = ?) 
             ORDER BY dibuat_pada DESC`,
            [keyword, keyword, keyword, status || null, status || null, kategori || null, kategori || null]
        );

        res.json(results);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ - fungsi untuk menampilkan review buku by id
exports.getBukuById = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM buku WHERE id = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.json(results[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// UPDATE - fungsi untuk mengedit buku by id
exports.editBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            judul, penulis, sampul_buku_url, rating,
            status, kategori, ringkasan, review,
            kutipan_favorit, jumlah_halaman, selesai_pada
        } = req.body;

        if (!judul || !penulis) {
            return res.status(400).json({ error: 'Judul dan penulis wajib diisi' });
        }

        const [result] = await db.query(
            `UPDATE buku
             SET judul = ?, penulis = ?, sampul_buku_url = ?, rating = ?,
                 status = ?, kategori = ?, ringkasan = ?, review = ?,
                 kutipan_favorit = ?, jumlah_halaman = ?, selesai_pada = ?
             WHERE id = ?`,
            [
                judul,
                penulis,
                toNullable(sampul_buku_url),
                toNullable(rating),
                status || 'selesai',
                toNullable(kategori),
                toNullable(ringkasan),
                toNullable(review),
                toNullable(kutipan_favorit),
                toNullable(jumlah_halaman),
                toNullable(selesai_pada),
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.json({ message: 'Review buku berhasil diupdate', id: Number(id) });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE - fungsi untuk delete buku by id
exports.deleteBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM buku WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.json({ message: 'Review berhasil dihapus', id: Number(id) });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ - fungsi untuk mengambil daftar kategori unik
exports.getBukuByKategori = async (req, res) => {
    try {
        const [results] = await db.query(
            "SELECT DISTINCT kategori FROM buku WHERE kategori IS NOT NULL AND kategori != '' ORDER BY kategori ASC"
        );
        const kategori = results.map((row) => row.kategori);
        res.json(kategori);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
