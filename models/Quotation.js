import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pdfName: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Quotation = mongoose.model('Quotation', quotationSchema);
export default Quotation;
