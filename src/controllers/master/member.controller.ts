import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";


export async function GetAllMember() {
    try {
        const dataAll: Member[] = await prisma.member.findMany({
            orderBy: { name: "asc" }
        });
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
        const checkMember: Member | null = await prisma.member.findFirst({
            where: {
                name: {
                    contains: MemberData.name
                }
            }
        });
        if (checkMember) {
            throw ({code: "THROW", message: "Member already exist"});
        }
        const dataCreate: Member = await prisma.member.create({
            data: {
                id: nanoid(),
                name: MemberData.name
            }
        });
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
        const dataUpdate: Member = await prisma.member.update({
            where: { id },
            data: { name: MemberData.name, updatedAt: new Date() }
        });
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
        const checkMember: Member | null = await prisma.member.findFirst({
            where: { id }
        });
        if (!checkMember) {
            throw ({code: "THROW", message: "Member not found"});
        }
        const dataDelete: Member = await prisma.member.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete member",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}