import Item from "../core/entity/Item";
import ItemRepository from "../core/repository/ItemRepository";
import UpdateItemQuantity from "../core/usecase/UpdateItemQuantity";
import GetByIdValidator from "../core/validate/GetByIdValidator";
import ItemValidator from "../core/validate/ItemValidator";
import UpdateQuantityValidator from "../core/validate/UpdateQuantityValidator";
import Logger from "../logger";
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
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const validator = new ItemValidator(body || {});
        let errorMessage;

        if (validator.getError()) {
            errorMessage = validator.getErrorMessage();
        }
        else {
            const item: Item = Item.fromJSON(validator.getValue());

            try {
                const createdItem = await this.updateQuantity.executeCreate(item);

                if (createdItem) {
                    res = new HttpResponseParams();
                    res.setStatusCode(200);
                    res.setData(createdItem);
                }
            }
            catch(error) {
                Logger.error('An error is caught while creating a new item');
                Logger.error(error);
            }
        }
        
        if (!res) {
            const message: string = 'Item creation has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }

    async deleteItem(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        let errorMessage;
        const validator = new GetByIdValidator(body || {});

        if (validator.getError()) {
            errorMessage = validator.getErrorMessage();
        }
        else {
            const { id } = validator.getValue() as { id: string };
        
            try {
                const deleted = await this.updateQuantity.executeDelete(id);

                if (deleted) {
                    res = new HttpResponseParams();
                    res.setStatusCode(200);
                }
            }
            catch (error) {
                Logger.error('An error is caught while deleting an item');
                Logger.error(error);
            }
        }
        
        if (!res) {
            const message: string = errorMessage || 'Item deletion has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }

    async updateItemQuantity(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const validator = new UpdateQuantityValidator(body || {});
        let errorMessage;

        if (validator.getError()) {
            errorMessage = validator.getErrorMessage();
        }
        else {
            const { id, quantityChange } = validator.getValue() as { id: string, quantityChange: number };

            try {
                const updatedItem = await this.updateQuantity.execute(id, quantityChange);

                if (updatedItem) {
                    res = new HttpResponseParams();
                    res.setStatusCode(200);
                    res.setData(updatedItem)
                }
            }
            catch (error) {
                Logger.error('An error is caught while updating the quantity of item');
                Logger.error(error);
            }
        }
        
        if (!res) {
            const message: string = errorMessage || 'Item quantity update has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }
}

export default ItemController;