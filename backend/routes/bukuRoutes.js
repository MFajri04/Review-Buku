const express= require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController')

router.post('/', bukuController.createBuku);
router.get('/', bukuController.getAllBuku);
router.get('/kategori', bukuController.getBukuByKategori);
router.get('/:id', bukuController.getBukuById);
router.put('/:id', bukuController.editBuku);
router.delete('/:id', bukuController.deleteBuku);

module.exports = router;