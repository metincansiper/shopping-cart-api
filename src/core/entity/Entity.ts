import {v4 as uuidv4} from 'uuid';
class Entity {
    id: string;

    constructor(){
        this.id = uuidv4()
    }
}

export default Entity;