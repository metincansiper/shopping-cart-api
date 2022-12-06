import Product from '../entity/Product';

interface ProductRepository {
    create(product: Product): Promise<Product>;
    find(opts?: Object): Promise<Product[]>;
    findBy(props: Object, opts?: Object): Promise<Product[]>;
    get(id: String): Promise<Product>;
    getMultiple(ids: String[]): Promise<Product[]>;
}

export default ProductRepository;