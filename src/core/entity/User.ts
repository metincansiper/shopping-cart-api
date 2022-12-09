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
}

export default User;