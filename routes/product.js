import express from 'express';
import { addProducts, getQuotations, downloadQuotation } from '../controllers/product.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, addProducts);
router.get('/quotations', authMiddleware, getQuotations);
router.get('/download/:pdfName', authMiddleware, downloadQuotation)

export default router;
