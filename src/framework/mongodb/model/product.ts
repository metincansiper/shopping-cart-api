import { model, Schema } from "mongoose";
import Product from "../../../core/entity/Product";
import User from "../../../core/entity/Product";

const productSchema = new Schema<Product>({
    name: { type: String },
    price: { type: Number }
});

const MongoProductModel = model<User>('Product', productSchema);
export default MongoProductModel;