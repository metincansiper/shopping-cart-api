import Entity from './Entity';

class Product extends Entity {
    name: string;
    price: number;

    constructor(name: string, price: number, id: string = '') {
        super(id);
        this.name = name;
        this.price = price;
    }

    static fromJSON(json: { name: string, price: number, id: string }) {
        const { name, price, id = '' } = json;
        return new Product(name, price, id);
    }
}

export default Product;