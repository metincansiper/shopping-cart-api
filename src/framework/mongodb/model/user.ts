import { model, Schema } from "mongoose";
import User from "../../../core/entity/User";

const userSchema = new Schema<User>({
    name: { type: String },
    surname: { type: String },
    email: { type: String },
    address: { type: String }
});

const MongoUserModel = model<User>('User', userSchema);
export default MongoUserModel;