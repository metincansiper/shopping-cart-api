import mongoose from "mongoose";
import Product from "../../../core/entity/Product";
import ProductRepository from "../../../core/repository/ProductRepository";
import MongoProductModel from "../model/product";
import { mongoEntityToJson } from "../util";

const mongoProductToProduct = (mongoProduct: mongoose.Document) => {
    const json: any = mongoEntityToJson(mongoProduct);
    return Product.fromJSON(json);
};

class MongoProductRepository implements ProductRepository {
    async create(product: Product): Promise<Product> {
        const mongoProduct = new MongoProductModel(product);
        await mongoProduct.save();
        return mongoProductToProduct(mongoProduct);
    }
    async findBy(props: Object, opts?: PaginationOptions): Promise<Product[]> {
        const {skip, limit} = opts || {};
        const query = MongoProductModel.find(props);
        if (limit) {
            query.limit(limit);
        }

        if (skip) {
            query.skip(skip);
        }

        const mongoProducts = await query.exec();
        const products: Product[] = mongoProducts.map(mongoProductToProduct);
        return products;
    }
    async getMultiple(ids: string[]): Promise<Product[]> {
        const mongoProducts = await MongoProductModel.find().where('_id').in(ids);
        const idToIndex = new Map<string, number>();
        
        ids.forEach((id, index) => {
            idToIndex.set(id, index);
        });

        const products: Product[] = new Array<Product>();
        mongoProducts.forEach(mongoProduct => {
            const product = mongoProductToProduct(mongoProduct);
            const index = idToIndex.get(mongoProduct.id) as number;
            products[index] = product;
        });

        return products;
    }
}

export default MongoProductRepository;