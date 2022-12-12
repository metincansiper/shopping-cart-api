import Entity from './Entity';
import Product from './Product';

class User extends Entity {
    name: string;
    surname: string;
    address: string;
    email: string;

    constructor(email: string, name: string, surname: string, address: string, id: string = '') {
        super(id);
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.address = address;
    }

    getEmail(): string {
        return this.email;
    }

    getName(): string {
        return this.name;
    }

    getSurname(): string {
        return this.surname;
    }

    getAddress(): string {
        return this.address;
    }

    clone(id: string = ''): User {
        return new User(this.getEmail(), this.getName(), this.getSurname(), this.getAddress(), id);
    }

    static fromJSON(json: { email: string, name: string, surname: string, address: string, id: string }) {
        const { email, name, surname, address, id = '' } = json;
        return new User(email, name, surname, address, id);
    }
}

export default User;