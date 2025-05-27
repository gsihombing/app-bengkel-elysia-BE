import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";



export async function GetAllVehicleType() {
    try {
        const dataAll: VehicleAllType[] = await prisma.vehicle_type.findMany({
            orderBy: { name: "asc" },
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
            message: "Success get all vehicle type",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError
    }
}

export async function CreateVehicleType(data: VehicleTypeCreate) {
    try {
        const checkVehicleCategory: VehicleCategory | null = await prisma.vehicle_category.findFirst({
            where: {
                id: data.vehicle_category_id
            }
        });
        if (!checkVehicleCategory) {            
            throw ({code: "THROW", message: "Vehicle category not found"});
        }
        const checkVehicleType: any = await prisma.vehicle_type.findFirst({
            where: {
                name: {
                    contains: data.name
                }
            }
        });
        if (checkVehicleType) {
            throw ({code: "THROW", message: "Vehicle type already exist"});
        }
        const dataCreate: VehicleType = await prisma.vehicle_type.create({
            data: {
                id: nanoid(),
                vehicle_category_id: data.vehicle_category_id,
                name: data.name
            }
        });
        return {
            success: true,
            message: "Success create vehicle type",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleType(id: TypeId, data: any) {
    try {
        const dataUpdate: VehicleType = await prisma.vehicle_type.update({
            where: { id },
            data: { vehicle_category_id: data.vehicle_category_id,
                    name: data.name, 
                    updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update vehicle type",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleType(id: TypeId) {
    try {
        const checkVehicleType: any = await prisma.vehicle_type.findFirst({
            where: { id }
        });
        if (!checkVehicleType) {
            throw ({code: "THROW", message: "Vehicle type not found"});
        }
        const dataDelete: VehicleType = await prisma.vehicle_type.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete vehicle type",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}