import { outError } from "../../helpers/utils";
import { VehicleCategoryById } from "../../models/master/vehicle-category.model";
import { VehicleTypeAll, VehicleTypeCheck, VehicleTypeCreate, VehicleTypeDelete, VehicleTypeUpdate } from "../../models/master/vehicle-type.model";



export async function GetAllVehicleType() {
    try {
        const dataAll: VehicleAllType = await VehicleTypeAll()
        return {
            success: true,
            message: "Success get all vehicle type",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError
    }
}

export async function CreateVehicleType(data: any) {
    try {
        const checkVehicleCategory: any = await VehicleCategoryById(data.vehicle_category_id);
        if (!checkVehicleCategory) {            
            throw ({code: "THROW", message: "Vehicle category not found"});
        }
        const checkVehicleType: any = await VehicleTypeCheck(data);
        if (checkVehicleType) {
            throw ({code: "THROW", message: "Vehicle type already exist"});
        }
        const dataCreate: VehicleType = await VehicleTypeCreate(data);
        return {
            success: true,
            message: "Success create vehicle type",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleType(id: any, data: any) {
    try {
        const dataUpdate: VehicleType = await VehicleTypeUpdate(id, data);
        return {
            success: true,
            message: "Success update vehicle type",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleType(id: any) {
    try {
        const dataDelete: any = await VehicleTypeDelete(id);
        if (!dataDelete) {
            throw ({code: "THROW", message: "Vehicle type not found"});
        }
        return {
            success: true,
            message: "Success delete vehicle type",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}