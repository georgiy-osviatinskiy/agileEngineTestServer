/**
 * @typedef pagination
 * @property {number} nextOffset
 * @property {number} nextPage
 * @property {number} totalCount
 */
import PaginationInterface from "./pagination.interface";

export default class PaginationDto {
    public nextOffset: number;
    public nextPage: number;
    public totalCount: number;

    constructor(pagination: PaginationInterface) {

        /**
         * @type {number}
         */
        this.nextOffset = pagination.nextOffset;

        /**
         * @type {number}
         */
        this.nextPage = pagination.nextPage;

        /**
         * @type {number}
         */
        this.totalCount = pagination.totalCount;
    }
}