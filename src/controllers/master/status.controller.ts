import { outError } from "../../helpers/utils";
import { StatusAll, StatusCreate, StatusUpdate, StatusDelete } from "../../models/master/status.models";


export async function GetAllStatus() {
    try {
        const data: Status = await StatusAll();
        return {
            success: true,
            message: "Success get all status",
            results: data
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateStatus(StatusData: StatusCreate) {
    try {
        const dataCreate: Status = await StatusCreate(StatusData);
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
        const dataUpdate: Status = await StatusUpdate(id, StatusData);
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
        const dataDelete: any = await StatusDelete(id);
        if (dataDelete.length === 0) {
            throw ({code: "THROW", message: "Status not found"});
        }
        return {
            success: true,
            message: "Success delete status",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}