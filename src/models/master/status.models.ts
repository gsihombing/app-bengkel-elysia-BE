import db from "../../lib/db.lib";


export async function StatusAll() {
    const sql: Sql = `SELECT * FROM status`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function StatusCreate(data: StatusCreate) {
    const sql: Sql = `INSERT INTO status ("name") VALUES ($1) RETURNING *`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function StatusUpdate(id: TypeId, data: StatusCreate) {
    const sql: Sql = `
    UPDATE status 
    SET "name" = $1, "updatedAt"=now() 
    WHERE id = $2 
    RETURNING *`;
    const values = [data.name, id];
    const { rows } = await db.query(sql, values);
    return rows;
}
