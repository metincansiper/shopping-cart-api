import mongoose from "mongoose";
import Item from "../../../core/entity/Item";
import ItemRepository from "../../../core/repository/ItemRepository";
import MongoItemModel from "../model/item";
import { mongoEntityToJson } from "../util";

const mongoItemToItem = (mongoItem: mongoose.Document) => {
    const json: any = mongoEntityToJson(mongoItem);
    return Item.fromJSON(json);
};

class MongoItemRepository implements ItemRepository {
    async create(item: Item): Promise<Item> {
        const mongoItem = new MongoItemModel(item);
        await mongoItem.save();
        return mongoItemToItem(mongoItem);
    }
    update(itemId: string, props: Object): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    async delete(itemId: string): Promise<Boolean> {
        try {
            await MongoItemModel.findByIdAndDelete(itemId);
            return true;
        }
        catch {
            return false;
        }
    }
    async get(itemId: string): Promise<Item | null> {
        const mongoItem = await MongoItemModel.findById(itemId);
        if (!mongoItem) {
            return null;
        }
        return mongoItemToItem(mongoItem);
    }
    findBy(props: Object): Promise<Item[]> {
        throw new Error("Method not implemented.");
    }

}

export default MongoItemRepository;