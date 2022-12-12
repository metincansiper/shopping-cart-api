import { valid } from "joi";
import Entity from "../../../core/entity/Entity";
import { cloneEntity, convertToJSON } from "../../mongodb/util";

abstract class InmemoryRepository {
    jsons: Map<string, any>;

    constructor() {
        this.jsons = new Map<string, any>();
    }
    async create<Type extends Entity>(entity: Type): Promise<Type> {
        const newEntity: Type = cloneEntity(entity) as Type;
        this.jsons.set(newEntity.getId(), convertToJSON(newEntity));
        return newEntity;
    }
    async get<Type extends Entity>(id: string): Promise<Type | null> {
        if (this.jsons.has(id)) {
            const json = this.jsons.get(id) || null;
            return this.fromJson(json) as Type;
        }
        return null;
    }
    async update<Type extends Entity>(id: string, props: Object): Promise<Type | null> {
        const json = this.jsons.get(id);
        if (!json) {
            return null;
        }
        
        const propsJson = convertToJSON(props);
        for (const key in propsJson) {
            json[key] = propsJson[key];
        }

        return this.fromJson(propsJson) as Type;
    }
    async delete(id: string): Promise<Boolean> {
        if (id in this.jsons) {
            this.jsons.delete(id);
            return true;
        }
        return false;
    }
    async findBy<Type extends Entity>(props: Object, opts?: PaginationOptions): Promise<Type[]> {
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
        const entities: Type[] = this.jsonsToEntities(resJsons);
        return entities;
    }

    async getMultiple<Type extends Entity>(ids: string[]): Promise<Type[]> {
        const resJsons = ids.map(id => this.jsons.get(id));
        const entities: Type[] = this.jsonsToEntities(resJsons);
        return entities;
    }

    jsonsToEntities<Type extends Entity>(jsons: any[]): Type[] {
        const entities: Type[] = jsons.map(obj => this.fromJson(obj)) as Type[];
        return entities;
    } 

    abstract fromJson(json: any): Entity;
}

export default InmemoryRepository;