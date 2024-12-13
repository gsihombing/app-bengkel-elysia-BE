import { outError } from "../../helpers/utils";
import { VehicleMerkAll, VehicleMerkCheck, VehicleMerkCreate, VehicleMerkUpdate, VehicleMerkDelete } from "../../models/master/vehicle-merk.model";


export async function GetAllVehicleMerk() {
    try {
        const dataAll: any = await VehicleMerkAll();
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
        const checkVehicleMerk: any = await VehicleMerkCheck(data);
        if (checkVehicleMerk[0]) {
            throw ({code: "THROW", message: "Vehicle merk already exist"});
        }
        const dataCreate: any = await VehicleMerkCreate(data);
        return {
            success: true,
            message: "Success create vehicle merk",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateVehicleMerk(id: any, data: any) {
    try {
        const dataUpdate: any = await VehicleMerkUpdate(id, data);
        return {
            success: true,
            message: "Success update vehicle merk",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteVehicleMerk(id: any) {
    try {
        const dataDelete: any = await VehicleMerkDelete(id);
        if (dataDelete.length === 0) {
            throw ({code: "THROW", message: "Vehicle merk not found"});
        }
        return {
            success: true,
            message: "Success delete vehicle merk",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}