import Entity from './Entity';

class Item extends Entity {
    userId: string;
    productId: string;
    quantity: number;
    
    constructor(userId: string, productId: string, quantity: number) {
        super();
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

export default Item;