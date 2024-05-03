const express = require('express');
const { addProduct, getPaginatedProducts, getDataGridProducts, toggleApproval, softDelete, editProduct, toggleActive } = require('../controllers/productController')
const {verifyToken , isSeller, isAdmin } = require('../middlewares/authentication')
const router = express.Router();

router.post('/addProduct', verifyToken , isSeller, addProduct);
router.get('/getPaginatedProducts', getPaginatedProducts);
router.get('/getDataGridProducts',verifyToken , isSeller, getDataGridProducts);
router.patch('/toggleApproval',verifyToken , isAdmin, toggleApproval);
router.patch('/toggleActive',verifyToken , isSeller, toggleActive);
router.patch('/softDelete',verifyToken , isSeller, softDelete);
router.patch('/edit',verifyToken , isSeller, editProduct);

module.exports = router;