import { outError } from "../../helpers/utils";
import { MemberAll, MemberCreate, MemberUpdate, MemberDelete, MemberCheck } from "../../models/master/member.model";

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
        const checkMember: any = await MemberCheck(MemberData);
        if (checkMember[0]) {
            throw ({code: "THROW", message: "Member already exist"});
        }
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

export async function UpdateMember(id: TypeId, MemberData: MemberCreate) {
    try {
        const dataUpdate: Member = await MemberUpdate(id, MemberData);
        return {
            success: true,
            message: "Success update member",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteMember(id: TypeId) {
    try {
        const dataDelete: any = await MemberDelete(id);
        if (dataDelete.length === 0) {
            throw ({code: "THROW", message: "Member not found"});
        }
        return {
            success: true,
            message: "Success delete member",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}