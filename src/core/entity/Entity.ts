class Entity {
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
}

export default Entity;