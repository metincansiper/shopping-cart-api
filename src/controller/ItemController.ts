import Item from "../core/entity/Item";
import ItemRepository from "../core/repository/ItemRepository";
import UpdateItemQuantity from "../core/usecase/UpdateItemQuantity";
import HttpErrorParams from "../param/HttpErrorParams";
import HttpRequestParams from "../param/HttpRequestParams";
import HttpResponseParams from "../param/HttpResponseParams";

class ItemController {
    itemRepository: ItemRepository;
    updateQuantity: UpdateItemQuantity;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
        this.updateQuantity = new UpdateItemQuantity(itemRepository);
    }

    async createItem(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        const item: Item = body as Item;
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const createdItem = await this.updateQuantity.executeCreate(item);

        if (createdItem) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
            res.setData(createdItem);
        }
        else {
            const message: string = 'Item creation has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }

    async deleteItem(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        const { id } = body as { id: string };
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const deleted = await this.updateQuantity.executeDelete(id);

        if (deleted) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
        }
        else {
            const message: string = 'Item deletion has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }

    async updateItemQuantity(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        const { id, quantityChange: quantityChangeRaw } = body as { id: string, quantityChange: number | string };
        const quantityChange: number = parseInt('' + quantityChangeRaw);
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const updated = await this.updateQuantity.execute(id, quantityChange);

        if (updated) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
        }
        else {
            const message: string = 'Item quantity update has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }
}

export default ItemController;