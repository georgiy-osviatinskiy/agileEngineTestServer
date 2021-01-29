import {Model, ModelCtor, Sequelize} from "sequelize-typescript";
import Image from "../models/image/image.model";

export default class ImageService {
    private Image: ModelCtor<Image>;

    constructor(sequelize: Sequelize) {
        this.Image = sequelize.model('Image') as any;
    }

    /**
     * @param {any[]} scopes
     * @returns {Promise<Image>}
     */
    async findOne(scopes) {
        return this.Image
            .scope(scopes)
            .findOne();
    }

    async getList(scopes) {
        return this.Image
            .scope(scopes)
            .findAll();
    }

    async getCount(scopes?: any[]) {
        return this.Image
            .scope(scopes)
            .count();
    }
}