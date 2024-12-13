import db from "../../lib/db.lib";


export async function VehicleYearAll() {
    const sql: Query = `
    SELECT * 
    FROM "vehicle_year"
    ORDER BY "year" ASC`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function VehicleYearCheck(data: VehicleYearCreate) {
    const sql: Query = `
    SELECT * 
    FROM "vehicle_year" 
    WHERE "year" = $1`;
    const values = [data.year];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleYearCreate(data: VehicleYearCreate) {
    const sql: Query = `
    INSERT INTO "vehicle_year" ("year") 
    VALUES ($1) 
    RETURNING *`;
    const values = [data.year];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleYearUpdate(id: TypeId, data: VehicleYearCreate) {
    const sql: Query = `
    UPDATE "vehicle_year" 
    SET "year" = $1, "updatedAt"=now() 
    WHERE id = $2 
    RETURNING *`;
    const values = [data.year, id];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleYearDelete(id: TypeId) {
    const sql: Query = `DELETE FROM "vehicle_year" WHERE id = $1 RETURNING *`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows;
}