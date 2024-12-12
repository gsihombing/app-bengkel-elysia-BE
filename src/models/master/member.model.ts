import db from "../../lib/db.lib";


export async function MemberAll() {
    const sql: Query = `
    SELECT * 
    FROM member
    ORDER BY "id" ASC`;
    const { rows } = await db.query(sql);
    return rows;
}

export async function MemberCheck(data: MemberCreate) {
    const sql: Query = `
    SELECT * 
    FROM member 
    WHERE "name" ILIKE $1`;
    const values = [data.name];
    const { rows } = await db.query(sql, values);
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

export async function MemberUpdate(id: TypeId, data: MemberCreate) {
    const sql: Query = `
    UPDATE member 
    SET "name" = $1, "updatedAt"=now() 
    WHERE id = $2 
    RETURNING *`;
    const values = [data.name, id];
    const { rows } = await db.query(sql, values);
    return rows;
}

export async function MemberDelete(id: TypeId) {
    const sql: Query = `DELETE FROM member WHERE id = $1 RETURNING *`;
    const values = [id];
    const { rows } = await db.query(sql, values);
    return rows;
}