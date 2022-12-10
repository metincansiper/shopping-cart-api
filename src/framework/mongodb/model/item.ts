import mongoose, { model, Schema } from "mongoose";
import Item from "../../../core/entity/Item";
import Product from "../../../core/entity/Product";
import User from "../../../core/entity/Product";

// TODO: userId and productId would not be just string
const itemSchema = new Schema<Item>({
    productId: { type: String },
    userId: { type: String },
    quantity: { type: Number }
});

const MongoItemModel = model<User>('Item', itemSchema);
export default MongoItemModel;