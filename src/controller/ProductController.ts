import Product from "../core/entity/Product";
import ProductRepository from "../core/repository/ProductRepository";
import CreateProduct from "../core/usecase/CreateProduct";
import SearchProduct from "../core/usecase/SearchProduct";
import ProductValidator from "../core/validate/ProductValidator";
import SearchByNameValidator from "../core/validate/SearchByNameValidator";
import Logger from "../logger";
import HttpErrorParams from "../param/HttpErrorParams";
import HttpRequestParams from "../param/HttpRequestParams";
import HttpResponseParams from "../param/HttpResponseParams";

class ProductController {
    productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        const validator = new ProductValidator(body || {});
        let errorMessage;

        if (validator.getError()) {
            errorMessage = validator.getErrorMessage();
        }
        else {
            const product: Product = Product.fromJSON(validator.getValue());
            
            const createProduct = new CreateProduct(this.productRepository);

            try {
                const createdProduct = await createProduct.execute(product);
            
                if (createdProduct) {
                    res = new HttpResponseParams();
                    res.setStatusCode(200);
                    res.setData(createdProduct);
                }
            }
            catch (error) {
                Logger.error('An error is caught while creating a new product');
                Logger.error(error);
            }
        }
        
        if (!res) {
            const message: string = errorMessage || 'Product creation has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }

    async searchProducts(req: HttpRequestParams) {
        const { queryParams } = req.toJson();
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        const validator = new SearchByNameValidator(queryParams || {});
        let errorMessage;
        
        if (validator.getError()) {
            errorMessage = validator.getErrorMessage();
        }
        else {
            const { name, skip, limit } = validator.getValue() as { name: string, skip?: number, limit?: number };
            const searchProduct = new SearchProduct(this.productRepository);

            try {
                const products = await searchProduct.executeByName(name, { skip, limit });
                
                if (products) {
                    res = new HttpResponseParams();
                    res.setStatusCode(200);
                    res.setData(products);
                }
            }
            catch (error) {
                Logger.error('An error is caught while searching all products');
                Logger.error(error);

                const message: string = 'Products search has failed';
                err = new HttpErrorParams({ message });
            }
        }

        return [res, err];
    }
}

export default ProductController;