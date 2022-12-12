import Entity from './Entity';

class Product extends Entity {
    name: string;
    price: number;

    constructor(name: string, price: number, id: string = '') {
        super(id);
        this.name = name;
        this.price = price;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    clone(id: string = ''): Product {
        return new Product(this.getName(), this.getPrice(), id);
    }

    static fromJSON(json: { name: string, price: number, id: string }) {
        const { name, price, id = '' } = json;
        return new Product(name, price, id);
    }
}

export default Product;