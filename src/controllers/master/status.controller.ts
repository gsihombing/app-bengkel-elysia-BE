import { outError } from "../../helpers/utils";
import { StatusAll } from "../../models/master/status.models";


export async function GetAllStatus() {
    try {
        const data: GetAllStatus = await StatusAll();
        return {
            success: true,
            message: "Success get all status",
            results: data
        };
    } catch (error) {
        return outError(error);
    }
}

export async function CreateStatus(data: StatusCreate) {
    try {
        // const data: GetAllStatus = await StatusAll();
        return {
            success: true,
            message: "Success create status",
            results: data
        };
    } catch (error) {
        return outError(error);
    }
}