import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";
import { outPageInfo } from "../../helpers/pageinfo";


export async function GetAllEmployee(query: QueryParams) {
    try {
        const offsetData = (query.page - 1) * query.limit
        const dataCount: number = await prisma.employee.count({
            where: {
                name: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            }
        });
        const pageInfo = outPageInfo(Number(query.page || 1), Number(query.limit || 10), dataCount);
        if (pageInfo.currentPage > pageInfo.totalPage) {
            throw ({code: "THROW", message: "Page not found"});
        }
        const dataAll: Employee[]  = await prisma.employee.findMany({
            orderBy: { name: "asc" },
            take: Number(query.limit) || 10,
            skip: Number(offsetData) || 0,
            where: {
                name: {
                    contains: query.filter,
                    mode: "insensitive"
                }
            },
            include: {
                status: {
                    select: {
                        id: true,
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

export async function CreateEmployee(employeeData: EmployeeCreate) {
    try {
        const checkEmployee: Employee | null = await prisma.employee.findFirst({
            where: {
                name: {
                    startsWith: employeeData.name,
                    endsWith: employeeData.name,
                    contains: employeeData.name,
                    mode: "insensitive"
                }
            }
        });
        if (checkEmployee) {
            throw ({code: "THROW", message: "Employee already exist"});
        }
        const dataCreate: Employee = await prisma.employee.create({
            data: {
                id: nanoid(),
                status_id: employeeData.status_id,
                name: employeeData.name,
                point: 0,
                address: employeeData.address,
                phone_number: employeeData.phone_number
                }
        });
        return {
            success: true,
            message: "Success create level",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateEmployee(id: TypeId, LevelData: EmployeeCreate) {
    try {
        const dataUpdate: Employee = await prisma.employee.update({
            where: { id },
            data: { 
                status_id: LevelData.status_id,
                name: LevelData.name,
                point: LevelData.point,
                address: LevelData.address,
                phone_number: LevelData.phone_number,
                updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update level",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteEmployee(id: TypeId) {
    try {
        const checkEmployee: Employee | null = await prisma.employee.findFirst({
            where: { id }
        });
        if (!checkEmployee) {
            throw ({code: "THROW", message: "Employee not found"});
        }
        const dataDelete: Employee = await prisma.employee.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete level",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}
