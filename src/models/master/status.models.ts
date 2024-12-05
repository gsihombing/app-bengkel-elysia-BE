import db from "../../lib/db.lib";


export async function StatusAll() {
    const sql: Sql = `SELECT * FROM status`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function StatusCreate(data: StatusCreate) {
    const sql: Sql = `INSERT INTO status ("name") VALUES ($1) RETURNING *`;
    const { rows } = await db.query(sql, [data.name]);
    return rows;
}
