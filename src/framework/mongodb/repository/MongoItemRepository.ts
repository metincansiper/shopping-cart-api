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
    async update(itemId: string, props: Object): Promise<Item | null> {
        try {
            const mongoItem = await MongoItemModel.findByIdAndUpdate(itemId, props);
            if (!mongoItem) {
                return null;
            }
            return mongoItemToItem(mongoItem);
        }
        catch {
            return null;
        }
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
    async getByProps(userId: string, productId: string): Promise<Item | null> {
        const items = await this.findBy({userId, productId});
        if (items.length > 1) {
            throw 'Unexpectedly find multiple entry for the item while fetching by user and product ids';
        }
        if (items.length == 1) {
            return items[0];
        }
        return null;
    }
    async findBy(props: Object): Promise<Item[]> {
        const mongoItems = await MongoItemModel.find(props);
        const items: Item[] = mongoItems.map(mongoItemToItem);
        return items;
    }

}

export default MongoItemRepository;