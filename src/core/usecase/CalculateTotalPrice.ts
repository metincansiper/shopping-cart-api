import Product from "../entity/Product";
import ItemRepository from "../repository/ItemRepository";
import ProductRepository from "../repository/ProductRepository";

class CalculateTotalPrice {
    itemRepository: ItemRepository;
    productRepository: ProductRepository;

    constructor(itemRepository: ItemRepository, productRepository: ProductRepository) {
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
    }

    async execute(userId: string): Promise<number> {
        const items = await this.itemRepository.findBy({userId});
        const products: Product[] = await this.productRepository.getMultiple(items.map(item => item.productId));
        const total: number = items.reduce((currTotal, currItem, index) => currTotal + currItem.quantity * products[index].price, 0);
        return total;
    }
}

export default CalculateTotalPrice;