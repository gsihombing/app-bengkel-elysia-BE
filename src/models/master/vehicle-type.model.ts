import db from "../../lib/db.lib";


export async function VehicleTypeAll() {
    const sql: Query = `
    SELECT *
    FROM "vehicle_type"
    ORDER BY "id" ASC`;
    const { rows } = await db.query(sql);
    return rows
}

export async function VehicleTypeCheck(data: VehicleTypeCreate) {
    const sql: Query = `
    SELECT * 
    FROM "vehicle_type" 
    WHERE "name" ILIKE $1`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleTypeCreate(data: VehicleTypeCreate) {
    const sql: Query = `
    INSERT INTO "vehicle_type" 
    ("vehicle_category_id","name") 
    VALUES ($1, $2) 
    RETURNING *`;
    const values = [data.vehicle_category_id, data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}