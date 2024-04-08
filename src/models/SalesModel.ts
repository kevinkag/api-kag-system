import mongoose, { Schema, Document } from 'mongoose';

export interface ISales extends Document {
    date: Date;
    products: ISalesItem[];
}

export interface ISalesItem extends Document {
    productId: string;
    units: number;
    totalAmount: number; // Nuevo campo para almacenar el total de la cuenta
}

const ProductSchema: Schema = new Schema({
    productId: { type: String, required: true },
    units: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
}, { _id: false }); // Esto evita que se genere automáticamente un _id para los productos

const SalesSchema: Schema = new Schema({
    date: { type: Date, required: true },
    products: [ProductSchema]
});

const SalesModel = mongoose.model<ISales>('Sale', SalesSchema);

export default SalesModel;
