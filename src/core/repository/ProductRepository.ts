import Product from '../entity/Product';

interface ProductRepository {
    create(product: Product): Promise<Product>;
    findBy(props?: Object, opts?: PaginationOptions): Promise<Product[]>;
    get(id: string): Promise<Product>;
    getMultiple(ids: string[]): Promise<Product[]>;
}

export default ProductRepository;