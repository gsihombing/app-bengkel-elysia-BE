import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";


export async function GetAllVehicleYear() {
    try {
        const dataAll: VehicleYear[] = await prisma.vehicle_year.findMany({
            orderBy: { year: "asc" }
        });
        return {
            success: true,
            message: "Success get all vehicle year",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateVehicleYear(data: VehicleYearCreate) {
    try {
        const checkVehicleYear: VehicleYear | null = await prisma.vehicle_year.findFirst({
            where: {
                year: {
                    contains: data.year
                }
            }
        });
        if (checkVehicleYear) {
            throw ({code: "THROW", message: "Vehicle year already exist"});
        }
        const dataCreate: VehicleYear = await prisma.vehicle_year.create({
            data: {
                id: nanoid(),
                year: data.year
            }
        });
        return {
            success: true,
            message: "Success create vehicle year",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleYear(id: TypeId, data: VehicleYearCreate) {
    try {
        const dataUpdate: VehicleYear = await prisma.vehicle_year.update({
            where: { id },
            data: { year: data.year, updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update vehicle year",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleYear(id: TypeId) {
    try {
        const checkVehicleYear: VehicleYear | null = await prisma.vehicle_year.findFirst({
            where: { id }
        });
        if (!checkVehicleYear) {
            throw ({code: "THROW", message: "Vehicle year not found"});
        }
        const dataDelete: VehicleYear = await prisma.vehicle_year.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete vehicle year",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}