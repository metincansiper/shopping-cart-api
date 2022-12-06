import Item from '../entity/Item';

interface ItemRepository {
    create(item: Item): Promise<Item>;
    update(itemId: String, props: Object): Promise<Item>;
    delete(itemId: String): Promise<Boolean>;
    get(itemId: String): Promise<Item>;
    getByProps(userId: String, productId: String): Promise<Item>;
    findBy(props: Object): Promise<Item[]>;
}

export default ItemRepository;