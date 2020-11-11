export interface PaginationResponse<T> {
    items: T[],
    meta: Meta
}

export interface Meta {
    currentPage: string,
    itemCount: number,
    itemsPerPage: string,
    totalItems: number,
    totalPages: number
}