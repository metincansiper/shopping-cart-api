import Item from "../core/entity/Item";
import ItemRepository from "../core/repository/ItemRepository";
import UpdateItemQuantity from "../core/usecase/UpdateItemQuantity";
import validateGetById from "../core/validate/getById";
import validateItem from "../core/validate/item";
import validateUpdateQuantity from "../core/validate/updateQuantity";
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

        const validation = validateItem(body || {});
        let errorMessage;

        if (validation.error) {
            errorMessage = validation.error.message;
        }
        else {
            const item: Item = validation.value as Item;

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
        const validation = validateGetById(body || {});

        if (validation.error) {
            errorMessage = validation.error.message;
        }
        else {
            const { id } = validation.value as { id: string };
        
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

        const validation = validateUpdateQuantity(body || {});
        let errorMessage;

        if (validation.error) {
            errorMessage = validation.error.message;
        }
        else {
            const { id, quantityChange } = validation.value as { id: string, quantityChange: number };

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