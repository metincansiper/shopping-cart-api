import Product from "../../../core/entity/Product";
import ProductRepository from "../../../core/repository/ProductRepository";
import InmemoryRepository from "./InmemoryRepository";

class InmemoryProductRepository extends InmemoryRepository implements ProductRepository {
    fromJson(json: any): Product {
        return Product.fromJSON(json);
    }
}

export default InmemoryProductRepository;