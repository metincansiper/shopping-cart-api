import Entity from './Entity';

class Item extends Entity {
    userId: String;
    productId: String;
    quantity: number;
    
    constructor(userId: String, productId: String, quantity: number) {
        super();
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

export default Item;