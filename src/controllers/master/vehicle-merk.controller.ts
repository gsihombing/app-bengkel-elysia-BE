import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";


export async function GetAllVehicleMerk() {
    try {
        const dataAll: VehicleMerk[] = await prisma.vehicle_merk.findMany({
            orderBy: { name: "asc" }
        });
        return {
            success: true,
            message: "Success get all vehicle merk",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateVehicleMerk(data: any) {
    try {
        const checkVehicleMerk: VehicleMerk | null = await prisma.vehicle_merk.findFirst({
            where: {
                name: {
                    contains: data.name
                }
            }
        });
        if (checkVehicleMerk) {
            throw ({code: "THROW", message: "Vehicle merk already exist"});
        }
        const dataCreate: VehicleMerk = await prisma.vehicle_merk.create({
            data: {
                id: nanoid(),
                name: data.name
            }
        });
        return {
            success: true,
            message: "Success create vehicle merk",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleMerk(id: TypeId, data: any) {
    try {
        const dataUpdate: VehicleMerk = await prisma.vehicle_merk.update({
            where: { id },
            data: { name: data.name, updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update vehicle merk",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleMerk(id: TypeId) {
    try {
        const checkVehicleMerk: VehicleMerk | null = await prisma.vehicle_merk.findFirst({
            where: { id }
        });
        if (!checkVehicleMerk) {
            throw ({code: "THROW", message: "Vehicle merk not found"});
        }
        const dataDelete: VehicleMerk = await prisma.vehicle_merk.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete vehicle merk",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}