import db from "../../lib/db.lib";


export async function VehicleMerkAll() {
    const sql: Query = `
    SELECT * 
    FROM vehicle_merk
    ORDER BY "id" ASC`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function VehicleMerkCheck(data: VehicleMerkCreate) {
    const sql: Query = `
    SELECT * 
    FROM vehicle_merk 
    WHERE "name" ILIKE $1`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleMerkCreate(data: VehicleMerkCreate) {
    const sql: Query = `
    INSERT INTO vehicle_merk ("name") 
    VALUES ($1) 
    RETURNING *`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleMerkUpdate(id: TypeId, data: VehicleMerkCreate) {
    const sql: Query = `
    UPDATE vehicle_merk 
    SET "name" = $1, "updatedAt"=now() 
    WHERE id = $2 
    RETURNING *`;
    const values = [data.name, id];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleMerkDelete(id: TypeId) {
    const sql: Query = `DELETE FROM vehicle_merk WHERE id = $1 RETURNING *`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows;
}