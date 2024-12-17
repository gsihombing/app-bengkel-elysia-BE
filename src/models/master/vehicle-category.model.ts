import db from "../../lib/db.lib";


export async function VehicleCategoryAll() {
    const sql: Query = `
    SELECT * 
    FROM "vehicle_category"
    ORDER BY "id" ASC`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function VehicleCategoryById(id: TypeId) {
    const sql: Query = `
    SELECT * 
    FROM "vehicle_category"
    WHERE "id" = $1`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows[0];
}

export async function VehicleCategoryCheck(data: VehicleCategoryCreate) {
    const sql: Query = `
    SELECT * 
    FROM "vehicle_category" 
    WHERE "name" ILIKE $1`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows[0];
}

export async function VehicleCategoryCreate(data: VehicleCategoryCreate) {
    const sql: Query = `
    INSERT INTO "vehicle_category" 
    ("name") 
    VALUES ($1) 
    RETURNING *`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleCategoryUpdate(id: TypeId, data: VehicleCategoryCreate) {
    const sql: Query = `
    UPDATE "vehicle_category" 
    SET "name" = $1, "updatedAt"=now() 
    WHERE id = $2 
    RETURNING *`;
    const values = [data.name, id];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleCategoryDelete(id: TypeId) {
    const sql: Query = `DELETE FROM "vehicle_category" WHERE id = $1 RETURNING *`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows[0];
}