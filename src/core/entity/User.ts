import Entity from './Entity';

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

    static fromJSON(json: { email: string, name: string, surname: string, address: string, id: string }) {
        const { email, name, surname, address, id = '' } = json;
        return new User(email, name, surname, address, id);
    }
}

export default User;