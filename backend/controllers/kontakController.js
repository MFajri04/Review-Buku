const db = require('../db')

//crate-tambah review
//method-create
exports.createBuku = (req,res) => {
    const {judul, penulis, sampul_buku_url, rating, status, kategori, ringkasan, review, kutipan_favorit, jumlah_halaman, selesai_pada, dibuat_pada}= req.body;
    db.query (
        'insert into buku(judul, penulis, sampul_buku_url, rating, status, kategori, ringkasan, review, kutipan_favorit, jumlah_halaman, selesai_pada, dibuat_pada) values(?,?,?,?,?,?,?,?,?,?,?,?)',
        [judul, penulis, sampul_buku_url, rating, status, kategori, ringkasan, review, kutipan_favorit, jumlah_halaman, selesai_pada, dibuat_pada],
        (err, result) => {
            if(err) return res.status(400).json({error: err.message});
            res.json({message: 'Review buku berhasil ditambahkan', id:result.insertId});
        }
    );
};


//read - fungsi untuk menampilkan semua review 
//method-get
exports.getAllBuku = (req, res) => {
    const { search, status, kategori } = req.query;
    const keyword = search ? `%${search}%` : null;

    db.query(
        `SELECT * FROM buku 
         WHERE (? IS NULL OR judul LIKE ? OR penulis LIKE ?) 
           AND (? IS NULL OR status = ?) 
           AND (? IS NULL OR kategori = ?) 
         ORDER BY dibuat_pada DESC`,
        [keyword, keyword, keyword, status || null, status || null, kategori || null, kategori || null],
        (err, results) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json(results);
        }
    );
};

//read - fungsi untuk menampilkan review buku by id
//method-get
exports.getBukuById = (req,res)=> {
    const {id} = req.params;
    db.query(
        'select * from buku where id=?',[id],
        (err, results) => {
            if(err) return res.status(400).json({error: err.message});
            if(result.length ===0) return res.status(400).json ({message:'Buku tidak ditemukan'})
            res.json(results[0]);
        }
    );
};

//edit - fungsi untuk mengedit buku by id
//method-put
exports.editBuku = (req, res)=>{
    const{id} = req.params;
    db.query(
        'update buku set judul=?, penulis=?, sampul_buku_url=?, rating=?, status=?, kategori=?, ringkasan=?, review=?, kutipan_favorit=?, jumlah_halaman=?, selesai_pada=?, dibuat_pada=? where id=?',
        [judul, penulis, sampul_buku_url, rating, status, kategori, ringkasan, review, kutipan_favorit, jumlah_halaman, selesai_pada, dibuat_pada, id],
        (err, result) => {
            if(err) return res.status(400).json({error: err.message});
            res.json({message: 'Review buku berhasil diupdate', id:result.insertId});
        }   

    )
}

//delete - fungsi untuk delete buku by id
//method-delete
exports.deleteBuku = (req,res)=>{
    const{id} = req.params;
    db.query(
        'delete from buku where id=?',[id],
        (err, result) => {
            if(err) return res.status(400).json({error: err.message});
            res.json({message: 'Review berhasil dihapus', id:result.insertId});
        } 
    )
}

//read - fungsi untuk 
//method - get

