import Product from '../entity/Product';
import ProductRepository from '../repository/ProductRepository';

class CreateProduct {
    productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(product: Product): Promise<Product> {
        const persistedProduct: Product = await this.productRepository.create(product);
        return persistedProduct;
    }
}

export default CreateProduct;