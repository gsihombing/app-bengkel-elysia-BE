import { outPageInfo } from "../../helpers/pageinfo";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";

export async function Dashboard(query: QueryParams) {
    try {
        const offsetData = (query.page - 1) * query.limit;
        const inventoryCount: CountData = await prisma.inventory.count({
            where: {
                warehouse_inventory: { warehouse: { id: query.id }},
                barang: {
                    name_barang: {
                        contains: query.filter,
                        mode: "insensitive"
                    }
                }
            }
        });
        const pageInfo = outPageInfo(Number(query.page || 1), Number(query.limit || 10), inventoryCount);
        const dashboardData: Dashboard | null = await prisma.warehouse.findUnique({
            where: { id: query.id },
            select: {
                id: true,
                name_warehouse: true,
                username: true,
                warehouse_address: true,
                phone_number_warehouse: true,
                level: {
                    select: {
                        name: true
                    }
                },
                warehouse_inventory: {
                    include: {
                        inventory: {
                            orderBy: { barang: { name_barang: "asc" } },
                            take: Number(query.limit) || 10,
                            skip: Number(offsetData) || 0,
                            where: {
                                barang: {
                                    name_barang: {
                                        contains: query.filter,
                                        mode: "insensitive"
                                    }
                                }
                            },
                            select: {
                                id: true,
                                barang_id: true,
                                qty: true,
                                barang: {
                                    select: {
                                        name_barang: true,
                                        description_barang: true,
                                        price: true,
                                        point: true,
                                        vehicle_category: {
                                            select: {
                                                name: true
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!dashboardData) {
            throw ({ code: "THROW", message: "Data not found !!!" });
        }
        return {
            success: true,
            message: "Success get data Dashboard",
            inventoryInfo: pageInfo,
            results: dashboardData
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}
