import fs from 'fs';
import Product from '../models/Product.js';
import { generatePDF } from '../utils/pdfGenerator.js';
import Quotation from '../models/Quotation.js';
import { v4 as uuidv4 } from 'uuid';
import { messages } from '../constants/messages.js';

export const addProducts = async (req, res) => {
    try {
        const { products } = req.body;

        const pdfName = `invoice_${uuidv4()}.pdf`;
        const newQuotation = new Quotation({
            userId: req.user.id,
            pdfName: pdfName
        });

        await newQuotation.save();

        const processedProducts = products.map(product => ({
            ...product,
            quotation: newQuotation._id
        }));

        const newProducts = await Product.insertMany(processedProducts);

        const pdfPath = await generatePDF(newProducts, pdfName);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${pdfName}"`,
        });

        const pdfStream = fs.createReadStream(pdfPath);
        pdfStream.pipe(res);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const getQuotations = async (req, res) => {
    try {
        const userId = req.user.id;

        const quotations = await Quotation.find({ userId }).select('pdfName date');
        if (quotations.length === 0) {
            return res.status(404).json({ msg: messages.quotation.notExists });
        }

        let token = req.header('Authorization');
        const pdfsWithLinks = quotations.map(quotation => {
            return {
                id: quotation._id,
                date: quotation.date,
                pdfUrl: `/api/products/download/${quotation.pdfName}?Authorization=${token}`
            };
        });

        return res.status(200).json({ pdfs: pdfsWithLinks });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const downloadQuotation = async (req, res) => {
    try {
        const pdfName = req.params.pdfName;

        const pdfPath = `./pdf/${pdfName}`;

        if (fs.existsSync(pdfPath)) {
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${pdfName}"`,
            });
            const pdfStream = fs.createReadStream(pdfPath);
            pdfStream.pipe(res);
        } else {
            return res.status(404).json({ msg: messages.pdf.notFound });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
