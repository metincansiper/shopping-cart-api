import ItemRepository from "../core/repository/ItemRepository";
import ProductRepository from "../core/repository/ProductRepository";
import CalculateTotalPrice from "../core/usecase/CalculateTotalPrice";
import validateGetByUserId from "../core/validate/getByUserId";
import Logger from "../logger";
import HttpErrorParams from "../param/HttpErrorParams";
import HttpRequestParams from "../param/HttpRequestParams";
import HttpResponseParams from "../param/HttpResponseParams";

class CartController {
    itemRepository: ItemRepository;
    productRepository: ProductRepository;

    constructor(itemRepository: ItemRepository, productRepository: ProductRepository) {
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
    }

    async calculateTotalPrice(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { queryParams } = req.toJson();
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        const validation = validateGetByUserId(queryParams || {});
        let errorMessage;

        if (validation.error) {
            errorMessage = validation.error.message;
        }
        else {
            const { userId } = validation.value as { userId: string };
        
            try {
                const calcTotalPrice = new CalculateTotalPrice(this.itemRepository, this.productRepository);
                const totalPrice = await calcTotalPrice.execute(userId);
                res = new HttpResponseParams();
                res.setStatusCode(200);
                res.setData(totalPrice);
            }
            catch(error) {
                Logger.error('An error is caught while calculating total price');
                Logger.error(error);
            }
        }

        if (!res) {
            const message: string = errorMessage || 'Total price calculation has failed';
            err = new HttpErrorParams({ message }); 
        }
        
        return [res, err];
    }
}

export default CartController;