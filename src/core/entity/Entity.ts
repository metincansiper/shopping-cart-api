abstract class Entity {
    id: string;

    constructor(id: string = ''){
        this.id = id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    abstract clone(id: string): Entity;
}

export default Entity;