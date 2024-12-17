import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  importProducts,
} from '../controllers/productController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.post('/import', protect, admin, upload.single('file'), importProducts);
router.post('/upload', protect, admin, upload.single('image'), uploadProductImage);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;