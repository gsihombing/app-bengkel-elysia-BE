import { outError } from "../../helpers/utils";
import { VehicleTypeAll, VehicleTypeCheck, VehicleTypeCreate } from "../../models/master/vehicle-type.model";



export async function GetAllVehicleType() {
    try {
        const dataAll: VehicleType = await VehicleTypeAll()
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
        const checkVehicleType: any = await VehicleTypeCheck(data);
        if (checkVehicleType[0]) {
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