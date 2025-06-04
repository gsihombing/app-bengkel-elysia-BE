import { Elysia, t } from "elysia";
import { GetAllWarehouse } from "../../controllers/master/warehouse.controller";


const routerWarehouse = new Elysia({ prefix: "/warehouse" });

routerWarehouse.get("/", ({ query }) => GetAllWarehouse( query));

export default routerWarehouse;