import ImageBaseDto from "./imageBase.dto";
import PaginationDto from "../base/pagination.dto";
import Image from "./image.model";
import PaginationInterface from "../base/pagination.interface";

export default class ImageListDto {
    public data: ImageBaseDto[];
    public pagination: PaginationDto;

    constructor(entities: Image[], pagination: PaginationInterface) {
        this.data = entities.map(image => new ImageBaseDto(image));

        this.pagination = new PaginationDto(pagination);
    }
}