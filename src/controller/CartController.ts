import ItemRepository from "../core/repository/ItemRepository";
import ProductRepository from "../core/repository/ProductRepository";
import CalculateTotalPrice from "../core/usecase/CalculateTotalPrice";
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
        console.log('calculate total');
        const { queryParams } = req.toJson();
        const { userId } = queryParams as { userId: string };
        console.log(userId);
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        try {
            const calcTotalPrice = new CalculateTotalPrice(this.itemRepository, this.productRepository);
            const totalPrice = await calcTotalPrice.execute(userId);
            console.log('totalPrice ', totalPrice);
            res = new HttpResponseParams();
            res.setStatusCode(200);
            res.setData(totalPrice);
        }
        catch(err) {
            Logger.error('An error is caught while calculating total price');
            Logger.error(err);

            const message: string = 'Total price calculation has failed';
            err = new HttpErrorParams({ message }); 
        }
        
        return [res, err];
    }
}

export default CartController;