import Entity from './Entity';

class Product extends Entity {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        super();
        this.name = name;
        this.price = price;
    }
}

export default Product;