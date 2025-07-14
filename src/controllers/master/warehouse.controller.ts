import { nanoid } from "nanoid";
import { outPageInfo } from "../../helpers/pageinfo";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";
import argon from "argon2";


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
        if (checkWarehouse) {
            throw ({ code: "THROW", message: "Warehouse already exists" });
        }
        const salt = (process.env.SALT+"-"+warehouseData.password+"-"+process.env.SALT);
        const encryptPassword = await argon.hash(salt);
        // console.log(salt.split("-")[1]);
        // Query Transaction START
        const result = await prisma.$transaction(async (tx) => {
            const createWarehose = await tx.warehouse.create({
                data: {
                    id: nanoid(),
                    level_id: warehouseData.level_id,
                    name_warehouse: warehouseData.name_warehouse,
                    username: warehouseData.username,
                    password: encryptPassword,
                    warehouse_address: warehouseData.warehouse_address,
                    phone_number_warehouse: warehouseData.phone_number_warehouse
                }
            });
            await tx.warehouse_inventory.create({
                data: {
                    id: nanoid(),
                    warehouse_id: createWarehose.id
                }
            });
            return createWarehose;
        })
        // Query Transaction END
        return {
            success: true,
            message: "Success create warehouse",
            results: result
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateWarehouse(id: TypeId, warehouseData: WarehouseCreate) {
    try {
        const checkWarehouse: Warehouse | null = await prisma.warehouse.findFirst({
            where: {
                id: id,
                name_warehouse: {
                    startsWith: warehouseData.name_warehouse,
                    endsWith: warehouseData.name_warehouse,
                    contains: warehouseData.name_warehouse,
                    mode: "insensitive"
                }
            }
        });
        if (!checkWarehouse) {
            throw ({ code: "THROW", message: "Warehouse not found" });
        }
        const salt = (process.env.SALT+"-"+warehouseData.password+"-"+process.env.SALT);
        const encryptPassword = await argon.hash(salt);
        const dataUpdate: Warehouse = await prisma.warehouse.update({
            where: { id },
            data: {
                level_id: warehouseData.level_id,
                name_warehouse: warehouseData.name_warehouse,
                username: warehouseData.username,
                password: encryptPassword,
                warehouse_address: warehouseData.warehouse_address,
                phone_number_warehouse: warehouseData.phone_number_warehouse,
                updatedAt: new Date()
            }
        });
        return {
            success: true,
            message: "Success update warehouse",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

