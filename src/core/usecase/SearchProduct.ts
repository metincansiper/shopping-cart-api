import Product from '../entity/Product';
import ProductRepository from '../repository/ProductRepository';

class SearchProduct {
    productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(opts?: PaginationOptions): Promise<Product[]> {
        const products: Product[] = await this.productRepository.findBy({}, opts);
        return products;
    }

    async executeByName(name: string, opts?: PaginationOptions): Promise<Product[]> {
        const products: Product[] = await this.productRepository.findBy({name}, opts);
        return products;
    }
}

export default SearchProduct;