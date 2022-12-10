import Product from "../../../core/entity/Product";
import ProductRepository from "../../../core/repository/ProductRepository";
import MongoProductModel from "../model/product";
import { mongoEntityToJson } from "../util";

class MongoProductRepository implements ProductRepository {
    async create(product: Product): Promise<Product> {
        const mongoProduct = new MongoProductModel(product);
        await mongoProduct.save();
        const json: any = mongoEntityToJson(mongoProduct);
        return Product.fromJSON(json);
    }
    find(opts?: Object | undefined): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findBy(props: Object, opts?: Object | undefined): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    getMultiple(ids: string[]): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}

export default MongoProductRepository;