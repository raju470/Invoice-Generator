import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    quotation: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
