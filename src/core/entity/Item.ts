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

    getUserId(): string {
        return this.userId;
    }

    getProductId(): string {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    clone(id: string = ''): Item {
        return new Item(this.getUserId(), this.getProductId(), this.getQuantity(), id);
    }

    static fromJSON(json: { userId: string, productId: string, quantity: number, id: string }) {
        const { userId, productId, quantity, id = '' } = json;
        return new Item(userId, productId, quantity, id);
    }
}

export default Item;