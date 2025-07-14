import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";
import { outPageInfo } from "../../helpers/pageinfo";




export async function GetAllUsers(query: QueryParams) {
    try {
        const offsetData = (query.page - 1) * query.limit
        const dataCount: CountData = await prisma.users.count({
            where: {
                no_police: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            }
        });
        const pageInfo = outPageInfo(Number(query.page || 1), Number(query.limit || 10), dataCount);
        if (pageInfo.currentPage > pageInfo.totalPage) {
            throw ({code: "THROW", message: "Page not found"});
        }
        const dataAll: Users[]  = await prisma.users.findMany({
            orderBy: { name: "asc" },
            take: Number(query.limit) || 10,
            skip: Number(offsetData) || 0,
            where: {
                no_police: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                no_police: true,
                name: true,
                point: true,
                address: true,
                phone_number: true,
                status: {
                    select: {
                        name: true
                    }
                },
                member: {
                    select: {
                        name: true
                    }
                },
                vehicle_year: {
                    select: {
                        year: true
                    }
                },
                vehicle_merk: {
                    select: {
                        name: true
                    }
                },
                vehicle_type: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return {
            success: true,
            message: "Success get all employee",
            pageInfo,
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateUsers(userData: UsersCreate) {
    try {
        console.log(userData);
        const checkUsers: Users | null = await prisma.users.findFirst({
            where: {
                no_police: {
                    contains: userData.no_police,
                    mode: "insensitive"
                }
            }
        });
        if (checkUsers) {
            throw ({code: "THROW", message: "Users already exist"});
        }
        const dataCreate: Users = await prisma.users.create({
            data: {
                id: nanoid(),
                status_id: userData.status_id,
                member_id: userData.member_id,
                vehicle_year_id: userData.vehicle_year_id,
                vehicle_merk_id: userData.vehicle_merk_id,
                vehicle_type_id: userData.vehicle_type_id,
                no_police: userData.no_police,
                name: userData.name,
                point: 0,
                address: userData.address,
                phone_number: userData.phone_number
                }
        });
        return {
            success: true,
            message: "Success create users data",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateUsers(nopol: TypeId, userData: UsersCreate) {
    try {
        const checkUsers: Users | null = await prisma.users.findFirst({
            where: {
                no_police: {
                    contains: nopol,
                    mode: "insensitive"
                }
            }
        });
        if (!checkUsers) {
            throw ({code: "THROW", message: "Users not found"});
        }
        const dataUpdate: Users = await prisma.users.update({
            where: {id: checkUsers.id},
            data: {
                status_id: userData.status_id,
                member_id: userData.member_id,
                vehicle_year_id: userData.vehicle_year_id,
                vehicle_merk_id: userData.vehicle_merk_id,
                vehicle_type_id: userData.vehicle_type_id,
                no_police: userData.no_police,
                name: userData.name,
                address: userData.address,
                phone_number: userData.phone_number,
                updatedAt: new Date()
            }
        });
        return {
            success: true,
            message: "Success update users data",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteUsers(nopol: TypeId) {
    try {
        const checkUsers: Users | null = await prisma.users.findFirst({
            where: {
                no_police: {
                    contains: nopol,
                    mode: "insensitive"
                }
            }
        });
        if (!checkUsers) {
            throw ({code: "THROW", message: "Users not found"});
        }
        const dataDelete: Users = await prisma.users.delete({
            where: {id: checkUsers.id}
        });
        return {
            success: true,
            message: "Success delete users data",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}