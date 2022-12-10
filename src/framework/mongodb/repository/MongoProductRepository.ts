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
    async findBy(props: Object, opts?: Object | undefined): Promise<Product[]> {
        const mongoProducts = await MongoProductModel.find(props);
        const products: Product[] = mongoProducts.map(mongoProductToProduct);
        return products;
    }
    get(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    getMultiple(ids: string[]): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}

export default MongoProductRepository;