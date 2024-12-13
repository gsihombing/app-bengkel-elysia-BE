import { outError } from "../../helpers/utils";
import { VehicleCategoryAll, VehicleCategoryCheck, VehicleCategoryCreate, VehicleCategoryDelete, VehicleCategoryUpdate } from "../../models/master/vehicle-category.model";



export async function GetAllVehicleCategory() {
    try {
        const dataAll: VehicleCategory = await VehicleCategoryAll();
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
        const checkVehicleCategory: any = await VehicleCategoryCheck(data);
        if (checkVehicleCategory[0]) {
            throw ({code: "THROW", message: "Vehicle category already exist"});
        }
        const dataCreate: VehicleCategory = await VehicleCategoryCreate(data);
        return {
            success: true,
            message: "Success create vehicle category",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleCategory(id: any, data: any) {
    try {
        const dataUpdate: VehicleCategory = await VehicleCategoryUpdate(id, data);
        return {
            success: true,
            message: "Success update vehicle category",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleCategory(id: any) {
    try {
        const dataDelete: any = await VehicleCategoryDelete(id);
        if (dataDelete.length === 0) {
            throw ({code: "THROW", message: "Vehicle category not found"});
        }
        return {
            success: true,
            message: "Success delete vehicle category",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}