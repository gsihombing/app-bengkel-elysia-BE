import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";



export async function GetAllVehicleCategory() {
    try {
        const dataAll: VehicleCategory[] = await prisma.vehicle_category.findMany({
            orderBy: { name: "asc" }
        });
        return {
            success: true,
            message: "Success get all vehicle category",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateVehicleCategory(data: any) {
    try {
        const checkVehicleCategory: VehicleCategory | null = await prisma.vehicle_category.findFirst({
            where: {
                name: {
                    contains: data.name
                }
            }
        });
        if (checkVehicleCategory) {
            throw ({code: "THROW", message: "Vehicle category already exist"});
        }
        const dataCreate: VehicleCategory = await prisma.vehicle_category.create({
            data: {
                id: nanoid(),
                name: data.name
            }
        });
        return {
            success: true,
            message: "Success create vehicle category",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleCategory(id: TypeId, data: any) {
    try {
        const dataUpdate: VehicleCategory = await prisma.vehicle_category.update({
            where: { id },
            data: { name: data.name, updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update vehicle category",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleCategory(id: TypeId) {
    try {
        const checkVehicleCategory: VehicleCategory | null = await prisma.vehicle_category.findFirst({
            where: { id }
        });
        if (!checkVehicleCategory) {
            throw ({code: "THROW", message: "Vehicle category not found"});
        }
        const dataDelete: VehicleCategory = await prisma.vehicle_category.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete vehicle category",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}