import db from "../../lib/db.lib";


export async function MemberAll() {
    const sql: Query = `
    SELECT * 
    FROM member
    ORDER BY "id" ASC`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function MemberCreate(data: MemberCreate) {
    const sql: Query = `
    INSERT INTO member ("name") 
    VALUES ($1) 
    RETURNING *`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
    return rows;
}