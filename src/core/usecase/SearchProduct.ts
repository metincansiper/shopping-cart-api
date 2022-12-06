import Product from '../entity/Product';
import ProductRepository from '../repository/ProductRepository';

class SearchProduct {
    productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(opts?: Object): Promise<Product[]> {
        const products: Product[] = await this.productRepository.find();
        return products;
    }

    async executeByName(name: String): Promise<Product[]> {
        const products: Product[] = await this.productRepository.findBy({name});
        return products;
    }
}

export default SearchProduct;