import Item from "../entity/Item";
import ItemRepository from "../repository/ItemRepository";

class UpdateItemQuantity {
    itemRepository: ItemRepository;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
    }

    async execute(itemId: string, quantityChange: number): Promise<Item | null> {
        const item: Item | null = await this.itemRepository.get(itemId);
        const itemQuantity = item ? item.quantity : 0;
        const newQuantity = itemQuantity + quantityChange;
        if (!item || newQuantity <= 0) {
            return null;
        }

        const persistedItem: Item | null = await this.itemRepository.update(item.id, {quantity: newQuantity});
        return persistedItem;
    }

   async executeCreate(item: Item): Promise<Item|null> {
        const existingItem: Item | null = await this.getByProps(item.userId, item.productId);
        
        if (existingItem) {
            return null;
        }
        
        const persistedItem: Item = await this.itemRepository.create(item);
        return persistedItem;
   }

   async executeDelete(itemId: string): Promise<Boolean> {
        const item: Item | null = await this.itemRepository.get(itemId);
        if (!item) {
            return false;
        }

        await this.itemRepository.delete(itemId);
        return true;
   }

   private async getByProps(userId: string, productId: string): Promise<Item | null> {
        const items = await this.itemRepository.findBy({userId, productId});
        if (items.length > 1) {
            throw new Error('Unexpectedly find multiple entry for the item while fetching by user and product ids');
        }
        if (items.length == 1) {
            return items[0];
        }
        return null;
    }
}

export default UpdateItemQuantity;