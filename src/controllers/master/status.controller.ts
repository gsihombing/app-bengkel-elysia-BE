import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";


export async function GetAllStatus() {
    try {
        const dataAll: Status[]  = await prisma.status.findMany({
            orderBy: { name: "asc" }
        });
        return {
            success: true,
            message: "Success get all status",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateStatus(StatusData: StatusCreate) {
    try {
        const checkStatus: Status | null = await prisma.status.findFirst({
            where: {
                name: {
                    contains: StatusData.name
                }
            }
        });
        if (checkStatus) {
            throw ({code: "THROW", message: "Status already exist"});
        }
        const dataCreate: Status = await prisma.status.create({
            data: {
                id: nanoid(),
                name: StatusData.name
                }
        });
        return {
            success: true,
            message: "Success create status",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateStatus(id: TypeId, StatusData: StatusCreate) {
    try {
        const dataUpdate: Status = await prisma.status.update({
            where: { id },
            data: { name: StatusData.name, updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update status",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteStatus(id: TypeId) {
    try {
        const checkStatus: Status | null = await prisma.status.findFirst({
            where: { id }
        });
        if (!checkStatus) {
            throw ({code: "THROW", message: "Status not found"});
        }
        const dataDelete: Status = await prisma.status.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete status",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}
