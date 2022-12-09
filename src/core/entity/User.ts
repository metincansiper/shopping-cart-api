import Entity from './Entity';

class User extends Entity {
    name: string;
    surname: string;
    address: string;
    email: string;
    price: number;

    constructor(email: string, name: string, surname: string, address: string, price: number) {
        super();
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.price = price;
    }

    static fromJSON(json: { email: string, name: string, surname: string, address: string, price: number }) {
        const { email, name, surname, address, price } = json;
        return new User(email, name, surname, address, price);
    }
}

export default User;