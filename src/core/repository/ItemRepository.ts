import Item from '../entity/Item';

interface ItemRepository {
    create(item: Item): Promise<Item>;
    update(itemId: string, props: Object): Promise<Item | null>;
    delete(itemId: string): Promise<Boolean>;
    get(itemId: string): Promise<Item | null>;
    getByProps(userId: string, productId: string): Promise<Item | null>;
    findBy(props: Object): Promise<Item[]>;
}

export default ItemRepository;