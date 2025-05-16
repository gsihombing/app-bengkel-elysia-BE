import { outError } from "../../helpers/utils";
import { VehicleYearAll, VehicleYearCheck, VehicleYearCreate, VehicleYearUpdate, VehicleYearDelete } from "../../models/master/vehicle-year.model";


export async function GetAllVehicleYear() {
    try {
        const dataAll: VehicleYear = await VehicleYearAll();
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
        const checkVehicleYear: any = await VehicleYearCheck(data);
        if (checkVehicleYear) {
            throw ({code: "THROW", message: "Vehicle year already exist"});
        }
        const dataCreate: VehicleYear = await VehicleYearCreate(data);
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
        const dataUpdate: VehicleYear = await VehicleYearUpdate(id, data);
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
        const dataDelete: any = await VehicleYearDelete(id);
        if (!dataDelete) {
            throw ({code: "THROW", message: "Vehicle year not found"});
        }
        return {
            success: true,
            message: "Success delete vehicle year",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}