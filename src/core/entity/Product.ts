import Entity from './Entity';

class Product extends Entity {
    name: String;
    price: number;

    constructor(name: String, price: number) {
        super();
        this.name = name;
        this.price = price;
    }
}

export default Product;