import db from "../../lib/db.lib";


export async function StatusAll() {
    const sql: Sql = `SELECT * FROM status`;
    const { rows } = await db.query(sql);
    return rows;
}
