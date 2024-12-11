import { outError } from "../../helpers/utils";
import { MemberAll, MemberCreate } from "../../models/master/member.model";

export async function GetAllMember() {
    try {
        const dataAll: Member = await MemberAll();
        return {
            success: true,
            message: "Success get all member",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateMember(MemberData: MemberCreate) {
    try {
        const dataCreate: Member = await MemberCreate(MemberData);
        return {
            success: true,
            message: "Success create member",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}