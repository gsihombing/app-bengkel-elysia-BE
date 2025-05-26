export const outPageInfo = (page: number, limit: number, total: number) => {
    const totalPage = Math.ceil(total / limit);
    return {
        currentPage: page,
        totalPage: totalPage,
        nextPage: page < totalPage ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        totalData: total
    };
}