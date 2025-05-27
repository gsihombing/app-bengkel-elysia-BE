import { nanoid } from "nanoid";
import { outPageInfo } from "../../helpers/pageinfo";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";
import { Decimal } from "../../prisma/generated/prisma/runtime/library";


export async function GetAllBarang(query: QueryParams) {
    try {
        const offsetData = (query.page - 1) * query.limit
        const dataCount: CountData = await prisma.barang.count({
            where: {
                name_barang: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            }
        });
        const pageInfo = outPageInfo(Number(query.page || 1), Number(query.limit || 10), dataCount);
        if (pageInfo.currentPage > pageInfo.totalPage) {
            throw ({ code: "THROW", message: "Page not found" });
        }
        const dataAll: Barang[] = await prisma.barang.findMany({
            orderBy: { name_barang: "asc" },
            take: Number(query.limit) || 10,
            skip: Number(offsetData) || 0,
            where: {
                name_barang: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            },
            include: {
                vehicle_category: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return {
            success: true,
            message: "Success get all barang",
            pageInfo,
            results: dataAll
        };
    } catch (error) {
        return outError(error);
    }
}

export async function CreateBarang(barangData: BarangCreate) {
    try {
        const checkBarang: Barang | null = await prisma.barang.findFirst({
            where: {
                name_barang: {
                    startsWith: barangData.name_barang,
                    endsWith: barangData.name_barang,
                    contains: barangData.name_barang,
                    mode: "insensitive"
                }
            }
        });
        if (checkBarang) {
            throw ({ code: "THROW", message: "Barang already exists" });
        }
        const dataCreate = await prisma.barang.create({
            data: {
                id: nanoid(),
                category_vehicle_id: barangData.category_vehicle_id,
                name_barang: barangData.name_barang,
                description_barang: barangData.description_barang,
                price: barangData.price,
                point: barangData.point || 0,
                createdAt: new Date(),
            }
        });
        return {
            success: true,
            message: "Success create new barang",
            results: dataCreate
        };
    } catch (error) {
        return outError(error);
    }
}

export async function UpdateBarang(id: TypeId, barangData: BarangCreate) {
    try {
        const checkBarang: Barang | null = await prisma.barang.findFirst({
            where: { id }
        });
        if (!checkBarang) {
            throw ({ code: "THROW", message: "Barang not found" });
        }
        console.log(barangData);
        const dataUpdate = await prisma.barang.update({
            where: { id },
            data: {
                category_vehicle_id: barangData.category_vehicle_id,
                name_barang: barangData.name_barang,
                description_barang: barangData.description_barang,
                price: Decimal(barangData.price),
                point: barangData.point || 0,
                updatedAt: new Date(),
            }
        });
        return {
            success: true,
            message: "Success update barang",
            results: dataUpdate
        };
    } catch (error) {
        return outError(error);
    }
}

export async function DeleteBarang(id: TypeId) {
    try {
        const checkBarang: Barang | null = await prisma.barang.findFirst({
            where: { id }
        });
        if (!checkBarang) {
            throw ({ code: "THROW", message: "Barang not found" });
        }
        const dataDelete = await prisma.barang.delete({ where: { id } });
        return {
            success: true,
            message: "Success delete barang",
            results: dataDelete
        };
    } catch (error) {
        return outError(error);
    }
}