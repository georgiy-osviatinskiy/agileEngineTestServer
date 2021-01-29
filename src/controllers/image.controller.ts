import {Sequelize} from "sequelize-typescript";
import ImageService from "../services/image.service";
import ImageListDto from "../models/image/imageList.dto";
import PaginationHelper from "../helpers/pagination.helper";
import ImageExtendedDto from "../models/image/imageExtended.dto";
import {HttpStatusCode} from "../resources/http/HttpStatusCode";
const DEFAULT_PAGINATION_LIMIT = 20;
export default class ImageController {
    private imageService: ImageService;

    constructor(sequelize: Sequelize) {
        this.imageService = new ImageService(sequelize);
    }

    async getList({query}, res) {
        query.limit = parseInt(query.limit) || DEFAULT_PAGINATION_LIMIT
        query.offset = parseInt(query.offset) || 0;

        let items = [], count;
        const scopes = [];

        if (query.query) {
            scopes.push({method: ['search', query.query]});
        }

        count = await this.imageService.getCount(scopes);

        if (count) {
            scopes.push({method: ['pagination', query]})
            items = await this.imageService.getList(scopes);
        }

        res.status(HttpStatusCode.OK);
        res.json(new ImageListDto(items, PaginationHelper.buildPagination(query, count)));
        res.send();
    }

    async getImageDetails(req, res) {
        const image = await this.imageService.findOne([
            {method: ['byGuid', req.params.guid]},
            'withTags'
        ]);

        if (!image) {
            res.status(HttpStatusCode.NotFound);
            res.json({message: 'Image not found'});
            res.send();
        } else {
            res.status(HttpStatusCode.OK);
            res.json(new ImageExtendedDto(image));
            res.send();
        }
    }
}