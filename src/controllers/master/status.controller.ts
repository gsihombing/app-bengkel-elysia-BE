import { outError } from "../../helpers/utils";
import { StatusAll, StatusCreate } from "../../models/master/status.models";


export async function GetAllStatus() {
    try {
        const data: Status = await StatusAll();
        return {
            success: true,
            message: "Success get all status",
            results: data
        };
    } catch (error) {
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
    } catch (error) {
        return outError(error);
    }
}