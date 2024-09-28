import puppeteer from 'puppeteer';
import fs from 'fs';
import Handlebars from 'handlebars';

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
    const htmlTemplate = fs.readFileSync('./templates/template.html', 'utf8');
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const pdfPath = `./pdf/${pdfName}`;
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true
    });

    await browser.close();
    console.log('PDF Generated');

    return pdfPath;
};

