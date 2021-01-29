import ImageBaseDto from "./imageBase.dto";
import Image from "./image.model";

export default class ImageExtendedDto extends ImageBaseDto {
    public fullPicture: string;
    public author: string;
    public camera: string;
    public tags: string[];

    constructor(entity) {
        super(entity);

        /**
         * @type {string}
         */
        this.fullPicture = entity.fullPicture;

        /**
         * @type {string}
         */
        this.author = entity.author;

        /**
         * @type {string}
         */
        this.camera = entity.camera;

        this.tags = entity.tags
            ? entity.tags.map(tag => tag.name)
            : undefined;
    }
}