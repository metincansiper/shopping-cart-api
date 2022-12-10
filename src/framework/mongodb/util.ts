import mongoose from "mongoose";

export const mongoEntityToJson = (mongoEntity: mongoose.Document): Object => {
    const json = mongoEntity.toJSON();
    json.id = json._id;
    return json;
};