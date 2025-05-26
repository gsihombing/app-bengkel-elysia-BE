import { nanoid } from "nanoid";
import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";


export async function GetAllLevel() {
    try {
        const dataAll: Status[]  = await prisma.level.findMany({
            orderBy: { name: "asc" }
        });
        return {
            success: true,
            message: "Success get all level",
            results: dataAll
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function CreateLevel(levelData: LevelCreate) {
    try {
        const checkLevel: Level | null = await prisma.level.findFirst({
            where: {
                name: {
                    contains: levelData.name
                }
            }
        });
        if (checkLevel) {
            throw ({code: "THROW", message: "Level already exist"});
        }
        const dataCreate: Level = await prisma.level.create({
            data: {
                id: nanoid(),
                name: levelData.name
                }
        });
        return {
            success: true,
            message: "Success create level",
            results: dataCreate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateLevel(id: TypeId, LevelData: LevelCreate) {
    try {
        const dataUpdate: Level = await prisma.level.update({
            where: { id },
            data: { name: LevelData.name, updatedAt: new Date() }
        });
        return {
            success: true,
            message: "Success update level",
            results: dataUpdate
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function DeleteLevel(id: TypeId) {
    try {
        const checkLevel: Level | null = await prisma.level.findFirst({
            where: { id }
        });
        if (!checkLevel) {
            throw ({code: "THROW", message: "Level not found"});
        }
        const dataDelete: Status = await prisma.level.delete({
            where: { id }
        });
        return {
            success: true,
            message: "Success delete level",
            results: dataDelete
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}
