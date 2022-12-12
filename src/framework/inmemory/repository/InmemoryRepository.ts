import { valid } from "joi";
import Entity from "../../../core/entity/Entity";
import { cloneEntity, convertToJSON } from "../../mongodb/util";

abstract class InmemoryRepository {
    jsons: Map<string, any>;

    constructor() {
        this.jsons = new Map<string, any>();
    }
    async create(user: Entity): Promise<Entity> {
        const newUser = cloneEntity(user);
        this.jsons.set(newUser.getId(), convertToJSON(newUser));
        return newUser;
    }
    async get(id: string): Promise<Entity | null> {
        if (this.jsons.has(id)) {
            const json = this.jsons.get(id) || null;
            return json;
        }
        return null;
    }
    async update(id: string, props: Object): Promise<Entity | null> {
        const json = this.jsons.get(id);
        if (!json) {
            return null;
        }
        
        const propsJson = convertToJSON(props);
        for (const key in propsJson) {
            json[key] = propsJson[key];
        }

        return this.fromJson(propsJson);
    }
    async delete(id: string): Promise<Boolean> {
        if (id in this.jsons) {
            this.jsons.delete(id);
            return true;
        }
        return false;
    }
    async findBy(props: Object, opts?: PaginationOptions): Promise<Entity[]> {
        let {skip = 0, limit} = opts || {};
        let total = -1;
        if ( limit ) {
            total = skip + limit;
        }
        const propsJson = convertToJSON(props);
        let count = 0;
        const resJsons: any[] = [];
        for (const json of this.jsons.values()){
            for (const key in propsJson) {
                const val = propsJson[key];
                if (val != json[key]) {
                    continue;
                }
            }

            count += 1;

            if (count > skip) {
                resJsons.push(json);
            }

            if (count == total) {
                break;
            }
        }
        const entities: Entity[] = this.jsonsToEntities(resJsons) as Entity[];
        return entities;
    }

    async getMultiple(ids: string[]): Promise<Entity[]> {
        const resJsons = ids.map(id => this.jsons.get(id));
        const entities: Entity[] = this.jsonsToEntities(resJsons) as Entity[];
        return entities;
    }

    jsonsToEntities(jsons: any[]): Entity[] {
        const entities: Entity[] = jsons.map(obj => this.fromJson(obj));
        return entities;
    } 

    abstract fromJson(json: any): Entity;
}

export default InmemoryRepository;