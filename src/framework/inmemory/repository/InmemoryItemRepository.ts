import Item from "../../../core/entity/Item";
import ItemRepository from "../../../core/repository/ItemRepository";
import InmemoryRepository from "./InmemoryRepository";

class InmemoryItemRepository extends InmemoryRepository implements ItemRepository {
    async getByProps(userId: string, productId: string): Promise<Item | null> {
        const items = await this.findBy({userId, productId}) as Item[];
        if (items.length > 1) {
            throw 'Unexpectedly find multiple entry for the item while fetching by user and product ids';
        }
        if (items.length == 1) {
            return items[0];
        }
        return null;
    }
    fromJson(json: any): Item {
        return Item.fromJSON(json);
    }
}

export default InmemoryItemRepository;