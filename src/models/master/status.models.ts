import db from "../../lib/db.lib";


export async function StatusAll() {
const sql: Query = `
    SELECT * 
    FROM "status"
    ORDER BY "id" ASC`;
    const { rows } = await db.query(sql);
    return rows;
}


export async function StatusCheck(data: StatusCreate) {
    const sql: Query = `
    SELECT * 
    FROM "status" 
    WHERE "name" ILIKE $1`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows[0];
}

export async function StatusCreate(data: StatusCreate) {
const sql: Query = `
    INSERT INTO "status" 
    ("name") 
    VALUES ($1) 
    RETURNING *`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function StatusUpdate(id: TypeId, data: StatusCreate) {
const sql: Query = `
    UPDATE "status" 
    SET "name" = $1, "updatedAt"=now() 
    WHERE id = $2 
    RETURNING *`;
    const values = [data.name, id];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function StatusDelete(id: TypeId) {
const sql: Query = `DELETE FROM "status" WHERE id = $1 RETURNING *`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows[0];
}
