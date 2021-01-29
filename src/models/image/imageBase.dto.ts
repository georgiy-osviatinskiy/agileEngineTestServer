import Image from "./image.model";

export default class ImageBaseDto {
    public id: string;
    public croppedPicture: string;

    constructor(entity: Image) {
        /**
         * @type {string}
         */
        this.id = entity.guid;

        /**
         * @type {string}
         */
        this.croppedPicture = entity.croppedPicture;
    }
}