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
        const existingItem: Item | null = await this.itemRepository.getByProps(item.userId, item.productId);
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
}

export default UpdateItemQuantity;