import Item from '../entity/Item';

interface ItemRepository {
    create(item: Item): Promise<Item>;
    update(itemId: string, props: Object): Promise<Item>;
    delete(itemId: string): Promise<Boolean>;
    get(itemId: string): Promise<Item>;
    getByProps(userId: string, productId: string): Promise<Item>;
    findBy(props: Object): Promise<Item[]>;
}

export default ItemRepository;