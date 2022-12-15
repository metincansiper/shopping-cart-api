import Item from "../../../core/entity/Item";
import ItemRepository from "../../../core/repository/ItemRepository";
import InmemoryRepository from "./InmemoryRepository";

class InmemoryItemRepository extends InmemoryRepository implements ItemRepository {
    fromJson(json: any): Item {
        return Item.fromJSON(json);
    }
}

export default InmemoryItemRepository;