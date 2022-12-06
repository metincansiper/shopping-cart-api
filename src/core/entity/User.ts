import Entity from './Entity';

class User extends Entity {
    name: String;
    surname: String;
    address: String;
    email: String;
    price: number;

    constructor(email: String, name: String, surname: String, address: String, price: number) {
        super();
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.price = price;
    }
}

export default User;