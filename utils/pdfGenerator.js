import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { messages } from '../constants/messages.js';
import { fileURLToPath } from 'url';
import pdf from 'html-pdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateTotals = (products) => {
    let subtotal = 0;
    products.forEach(product => {
        product.total = product.qty * product.rate;
        subtotal += product.total;
    });

    const gst = subtotal * 0.18;  // GST is 18%
    const finalTotal = subtotal + gst;

    return { subtotal: subtotal, gst: gst, finalTotal: finalTotal };
};

// Generate PDF function
export const generatePDF = async (products, pdfName) => {
    const templatePath = path.join(__dirname, '../', 'templates', 'template.html');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(htmlTemplate);

    const totals = calculateTotals(products);

    const pdfData = {
        date: new Date().toLocaleDateString(),
        products: products.map(product => ({
            name: product.name,
            qty: product.qty,
            rate: product.rate,
            total: (product.qty * product.rate)
        })),
        subtotal: totals.subtotal,
        gst: totals.gst,
        finalTotal: totals.finalTotal
    };

    const html = template(pdfData);

    const pdfPath = path.join(__dirname, '../pdf', pdfName);

    return new Promise((resolve, reject) => {
        pdf.create(html, { format: 'A4', border: '10mm' }).toFile(pdfPath, (err, res) => {
            if (err) {
                console.error(messages.pdf.error, err);
                return reject(err);
            }

            console.log(messages.pdf.generated, pdfPath);
            resolve(pdfPath);
        });
    });
};
