import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    costPrice: number;
    sellingPrice: number;
    units: number;
    barcode: any;
    image: any;
    sold: number
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    units: { type: Number, required: true },
    barcode: { type: Object, required: false },
    image: { type: String, required: false },
    sold: { type: Number, required: false }
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;
