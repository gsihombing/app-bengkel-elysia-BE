import { outError } from "../../helpers/utils";
import prisma from "../../lib/prisma.lib";
import argon from "argon2";

export async function GetProfile(query: QueryParams) {
    try {
        const profile: Warehouse | null = await prisma.warehouse.findUnique({
            where: { id: query.id },
            select: {
                id: true,
                name_warehouse: true,
                username: true,
                warehouse_address: true,
                phone_number_warehouse: true,
                level: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (!profile) {
            throw ({ code: "THROW", message: "Profile not found" });
        }
        return {
            success: true,
            message: "Success get profile",
            results: profile
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}

export async function UpdateProfile(id: TypeId, body: WarehouseCreate) {
    try {
        const salt = (process.env.SALT+"-"+body.password+"-"+process.env.SALT);
        const encryptPassword = await argon.hash(salt);
        const updatedProfile: Warehouse = await prisma.warehouse.update({
            where: { id },
            data: {
                name_warehouse: body.name_warehouse,
                username: body.username,
                password: encryptPassword,
                warehouse_address: body.warehouse_address,
                phone_number_warehouse: body.phone_number_warehouse,
                updatedAt: new Date()
            },
            select: {
                id: true,
                name_warehouse: true,
                username: true,
                warehouse_address: true,
                phone_number_warehouse: true
            }
        });
        return {
            success: true,
            message: "Profile updated successfully",
            results: updatedProfile
        };
    } catch (error: ErrorResponse) {
        return outError(error);
    }
}