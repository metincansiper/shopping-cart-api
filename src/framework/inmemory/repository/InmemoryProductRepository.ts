import Product from "../../../core/entity/Product";
import ProductRepository from "../../../core/repository/ProductRepository";
import InmemoryRepository from "./InmemoryRepository";

class InmemoryProductRepository extends InmemoryRepository implements ProductRepository {
    async create(product: Product): Promise<Product> {
        return await super.create(product) as Product;
    }
    async findBy(props: Object, opts?: PaginationOptions): Promise<Product[]> {
        return await super.findBy(props, opts) as Product[];
    }
    async getMultiple(ids: string[]): Promise<Product[]> {
        return await super.getMultiple(ids) as Product[];
    }
    fromJson(json: any): Product {
        return Product.fromJSON(json);
    }
}

export default InmemoryProductRepository;