import {Sequelize} from "sequelize-typescript";
import Image from "../models/image/image.model";
import config from 'config';
import axios from 'axios';
import {HttpStatusCode} from "../resources/http/HttpStatusCode";

const DEFAULT_PAGINATION_LIMIT = 20;

export default class ExternalSourceService {
    private Image;
    private Tag;
    private ImageTag;
    private sequelize: Sequelize;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.Image = sequelize.model('Image');
        this.Tag = sequelize.model('Tag');
        this.ImageTag = sequelize.model('ImageTag');
    }

    async fetchImagesFromExternalSource() {
        let
            page = 1,
            authToken = await this.acquireAuthToken(),
            pictures: any[];

        do {
            try {
                pictures = await this.fetchImageList(page, DEFAULT_PAGINATION_LIMIT, authToken);

                for(const picture of pictures) {
                    await this.storeDetailedInfo(picture.id, authToken);
                }

                page++;
            } catch (err) {
                if (err.response.status === HttpStatusCode.Unauthorized) {
                    authToken = await this.acquireAuthToken();
                } else {
                    console.error(err);
                    process.exit(1);
                }
            }
        } while (pictures.length);
    }

    /**
     * @param {string} guid
     * @param {string} authToken
     * @returns {Promise<void>}
     */
    async storeDetailedInfo(guid: string, authToken: string) {
        const imageDetails = await this.fetchImageDetails(guid, authToken);
        const tagsList = imageDetails.tags.trim().split(' ');
        let storedTags;

        const [newImage, isNew] = await this.Image.upsert({
            guid: imageDetails.id,
            croppedPicture: imageDetails.cropped_picture,
            author: imageDetails.author,
            camera: imageDetails.camera,
            fullPicture: imageDetails.full_picture,
        });

        await this.Tag.bulkCreate(
            tagsList.map(name => ({ name})),
            {
                fields: ['name', 'createdAt', 'updatedAt'],
                updateOnDuplicate: ['name','updatedAt'],
                returning: true,
            }
        );

        if (isNew) {
            storedTags = await this.Tag
                .scope({ method: ['byName', tagsList]})
                .findAll();

            await this.ImageTag.bulkCreate(storedTags.map(tag => ({
                imageId: newImage.id,
                tagId: tag.id,
            })));
        }
    }

    /**
     * @param {number} page
     * @param {number} limit
     * @param {string} authToken
     * @returns {Promise<object>}
     */
    async fetchImageList(page: number, limit: number = 20, authToken: string) {
        const response = await axios.get(
            `${config.get('agileEngineServerUrl')}/images?page=${page}&limit=${limit}`,
            {
                headers: {Authorization: `Bearer ${authToken}`}
            }
        );

        return response.data.pictures;
    }

    async fetchImageDetails(imageGuid: string, authToken) {
        const response = await axios.get(
            `${config.get('agileEngineServerUrl')}/images/${imageGuid}`,
            {
                headers: {Authorization: `Bearer ${authToken}`}
            }
        );

        return response.data;
    }

    async acquireAuthToken() {
        const response = await axios.post(
            `${config.get('agileEngineServerUrl')}/auth`,
            {
                apiKey: config.get('apiKey'),
            }
        );

        return response.data.token;
    }
}
