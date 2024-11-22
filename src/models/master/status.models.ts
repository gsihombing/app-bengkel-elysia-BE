import db from "../../lib/db.lib";
// import { DataTypes } from "sequelize";


export async function StatusAll() {
    const sql: Sql = `SELECT * FROM status`;
    const { rows } = await db.query(sql);
    return rows;
}


// export const Status = db.define("status", {
//     // id: {
//     //     type: DataTypes.INTEGER,
//     //     primaryKey: true,
//     //     autoIncrement: true
//     // },
//     // name: {
//     //     type: DataTypes.STRING,
//     //     allowNull: false
//     // }
// });