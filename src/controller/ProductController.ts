import Product from "../core/entity/Product";
import ProductRepository from "../core/repository/ProductRepository";
import CreateProduct from "../core/usecase/CreateProduct";
import SearchProduct from "../core/usecase/SearchProduct";
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
        const product: Product = body as Product;
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const createProduct = new CreateProduct(this.productRepository);

        try {
            const createdProduct = await createProduct.execute(product);
        
            if (createdProduct) {
                res = new HttpResponseParams();
                res.setStatusCode(200);
                res.setData(createdProduct);
            }
        }
        catch (err) {
            Logger.error('An error is caught while creating a new product');
            Logger.error(err);
        }
        
        if (!res) {
            const message: string = 'Product creation has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }

    async searchProducts(req: HttpRequestParams) {
        const { queryParams } = req.toJson();
        const { name } = queryParams as { name: string };
        const searchProduct = new SearchProduct(this.productRepository);
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        try {
            const product = await searchProduct.execute(name);
            
            if (product) {
                res = new HttpResponseParams();
                res.setStatusCode(200);
                res.setData(product);
            }
        }
        catch (err) {
            Logger.error('An error is caught while searching all products');
            Logger.error(err);

            const message: string = 'Products search has failed';
            err = new HttpErrorParams({ message });
        }

        return [res, err];
    }
}

export default ProductController;