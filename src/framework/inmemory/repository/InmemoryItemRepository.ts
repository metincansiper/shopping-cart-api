import Item from "../../../core/entity/Item";
import ItemRepository from "../../../core/repository/ItemRepository";
import InmemoryRepository from "./InmemoryRepository";

const jsonsToItems = (jsons: any[]): Item[] => {
    const items: Item[] = jsons.map(Item.fromJSON);
    return items;
}

class InmemoryItemRepository extends InmemoryRepository implements ItemRepository {
    async create(item: Item): Promise<Item> {
        return await super.create(item) as Item;
    }
    async update(id: string, props: Object): Promise<Item | null> {
        return await super.update(id, props) as Item | null;
    }
    async get(id: string): Promise<Item | null> {
        return await super.get(id) as Item | null;
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
        return await super.findBy(props) as Item[];
    }
    fromJson(json: any): Item {
        return Item.fromJSON(json);
    }
}

export default InmemoryItemRepository;