import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";
import { outPageInfo } from "../../helpers/pageinfo";


export async function GetAllEmployee(query: QueryParams) {
    try {
        const offsetData = (query.page - 1) * query.limit
        const dataCount: CountData = await prisma.employee.count({
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
                        name: true
                    }
                },
                mekanik: {
                    select: {
                        id: true,
                        warehouse_id: true,
                        warehouse: {
                            select: {
                                name_warehouse: true,
                                warehouse_address: true,
                                phone_number_warehouse: true
                            }
                        }
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
        // Query Transaction START
        const result = await prisma.$transaction(async (tx) => {
            const dataCreate = await tx.employee.create({
                data: {
                    id: nanoid(),
                    status_id: employeeData.status_id,
                    name: employeeData.name,
                    point: 0,
                    address: employeeData.address,
                    phone_number: employeeData.phone_number
                }
            });
            await tx.mekanik.create({
                data: {
                    id: nanoid(),
                    employee_id: dataCreate.id,
                    warehouse_id: employeeData.warehouse_id
                }
            });
            return dataCreate;
        });
        // Query Transaction END
        return {
            success: true,
            message: "Success create level",
            results: result
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateEmployee(id: TypeId, LevelData: EmployeeCreate) {
    try {
        const checkEmployee: Employee | null = await prisma.employee.findFirst({
            where: { id }
        });
        if (!checkEmployee) {
            throw ({code: "THROW", message: "Employee not found"});
        }
        // Query Transaction START
        const result = await prisma.$transaction(async (tx) => {
            const dataUpdate = await tx.employee.update({
                where: { id },
                data: { 
                    status_id: LevelData.status_id,
                    name: LevelData.name,
                    point: LevelData.point,
                    address: LevelData.address,
                    phone_number: LevelData.phone_number,
                    updatedAt: new Date() 
                }
            });
            await tx.mekanik.updateMany({
                where: { employee_id: id },
                data: { warehouse_id: LevelData.warehouse_id }
            });
            return dataUpdate;
        })
        // Query Transaction END
        return {
            success: true,
            message: "Success update level",
            results: result
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
