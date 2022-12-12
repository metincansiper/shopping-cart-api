import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';
import Entity from "../../core/entity/Entity";

export const mongoEntityToJson = (mongoEntity: mongoose.Document): Object => {
    const json = mongoEntity.toJSON();
    json.id = json._id;
    return json;
};

export const cloneEntity = (entity: Entity): Entity => {
    const id = uuidv4();
    const newEntity = entity.clone(id);
    return newEntity;
}

export const convertToJSON = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
};