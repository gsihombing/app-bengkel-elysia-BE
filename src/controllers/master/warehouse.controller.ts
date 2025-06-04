import { nanoid } from "nanoid";
import { outPageInfo } from "../../helpers/pageinfo";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";


export async function GetAllWarehouse(query: QueryParams) {
    try {
        const offsetData = (query.page - 1) * query.limit;
        const dataCount: CountData = await prisma.warehouse.count({
            where: {
                name_warehouse: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            }
        });
        const pageInfo = outPageInfo(Number(query.page || 1), Number(query.limit || 10), dataCount);
        if (pageInfo.currentPage > pageInfo.totalPage) {
            throw ({ code: "THROW", message: "Page not found" });
        }
        const dataAll: Warehouse[] = await prisma.warehouse.findMany({
            orderBy: { name_warehouse: "asc" },
            take: Number(query.limit) || 10,
            skip: Number(offsetData) || 0,
            where: {
                name_warehouse: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            },
            include: {
                level: {
                    select: {
                        name: true
                    }  
                }
            }
        });
        return {
            success: true,
            message: "Success get all warehouse",
            pageInfo,
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }

}

export async function CreateWarehouse(warehouseData: WarehouseCreate) {
    try {
        const checkWarehouse: Warehouse | null = await prisma.warehouse.findFirst({
            where: {
                name_warehouse: {
                    startsWith: warehouseData.name_warehouse,
                    endsWith: warehouseData.name_warehouse,
                    contains: warehouseData.name_warehouse,
                    mode: "insensitive"
                }
            }
        });

        const createData = await prisma.$transaction(async (tx) => {
            const createWarehouse = await tx.warehouse.create({
                data: {
                    id: nanoid(),
                    level_id: warehouseData.level_id,
                    name_warehouse: warehouseData.name_warehouse,
                    username: warehouseData.username,
                    password: warehouseData.password,
                    warehouse_address: warehouseData.warehouse_address,
                    phone_number_warehouse: warehouseData.phone_number_warehouse
                }
            });

            // const createinventory = await tx.inventory.create({
            return createWarehouse;
        })
        // if (checkWarehouse) {
        //     throw ({ code: "THROW", message: "Warehouse already exists" });
        // }
        // const dataCreate = await prisma.warehouse.create({
        //     data: {
        //         level_id: warehouseData.level_id,
        //         name_warehouse: warehouseData.name_warehouse
        //     }
        // });
        return {
            success: true,
            message: "Success create warehouse",
            results: checkWarehouse
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}