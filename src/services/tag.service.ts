import {ModelCtor, Sequelize} from "sequelize-typescript";
import Tag from "../models/tag/tag.model";

export default class TagService {
    private Tag;

    constructor(sequelize: Sequelize) {
        this.Tag = sequelize.model('Tag');
    }

    async bulkCreateOrUpdate(payload: string[]) {
        // @ts-ignore
        return this.Tag.bulkCreate(
            payload,
            {
                // @ts-ignore
                fields: ['name', 'createdAt', 'updatedAt'],
                // @ts-ignore
                updateOnDuplicate: ['name', 'updatedAt'],
                returning: true,
            }
        )
    }
}