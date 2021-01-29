import PaginationInterface from "../models/base/pagination.interface";

export default class PaginationHelper {
    static buildPagination(query, count: any) {
        return {
            nextOffset: query.offset + query.limit,
            totalCount: count,
        } as PaginationInterface;
    }
}