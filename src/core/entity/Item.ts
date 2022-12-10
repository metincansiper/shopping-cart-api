import Entity from './Entity';

class Item extends Entity {
    userId: string;
    productId: string;
    quantity: number;
    
    constructor(userId: string, productId: string, quantity: number, id='') {
        super(id);
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    static fromJSON(json: { userId: string, productId: string, quantity: number, id: string }) {
        const { userId, productId, quantity, id = '' } = json;
        return new Item(userId, productId, quantity, id);
    }
}

export default Item;