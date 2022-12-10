import Product from "../core/entity/Product";
import ProductRepository from "../core/repository/ProductRepository";
import CreateProduct from "../core/usecase/CreateProduct";
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
        const createdProduct = await createProduct.execute(product);
        
        if (createdProduct) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
            res.setData(createdProduct);
        }
        else {
            const message: string = 'Product creation has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }
}

export default ProductController;