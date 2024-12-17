import db from "../../lib/db.lib";


export async function VehicleTypeAll() {
    const sql: Query = `
    SELECT 
    "vt"."id",
    "vt"."name",
    jsonb_build_object (
    'id',"vc"."id",
    'name',"vc"."name") AS "metadata" ,  
    "vt"."createdAt", 
    "vt"."updatedAt"
    FROM "vehicle_type" "vt" 
    LEFT JOIN "vehicle_category" "vc" ON "vt"."vehicle_category_id" = "vc"."id"
    ORDER BY "id" ASC;`;
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
    return rows[0];
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

export async function VehicleTypeUpdate(id: TypeId, data: VehicleTypeCreate) {
    const sql: Query = `
    UPDATE "vehicle_type" 
    SET "vehicle_category_id" = $1, "name" = $2, "updatedAt"=now() 
    WHERE id = $3 
    RETURNING *`;
    const values = [data.vehicle_category_id, data.name, id];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function VehicleTypeDelete(id: TypeId) {
    const sql: Query = `
    DELETE FROM "vehicle_type" 
    WHERE "id" = $1 
    RETURNING *`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows[0];
}