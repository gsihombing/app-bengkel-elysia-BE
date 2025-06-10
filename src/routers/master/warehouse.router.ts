import { Elysia, t } from "elysia";
import { CreateWarehouse, GetAllWarehouse, UpdateWarehouse } from "../../controllers/master/warehouse.controller";


const routerWarehouse = new Elysia({ prefix: "/warehouse" });

routerWarehouse.get("/", ({ query }) => GetAllWarehouse( query));
routerWarehouse.post("/", ({ body }) => CreateWarehouse(body as WarehouseCreate), {
    body: t.Object({
        level_id: t.String({
            type: "string",
            required: true
        }),
        name_warehouse: t.String({
            type: "string",
            required: true
        }),
        username: t.String({
            type: "string"
        }),
        password: t.String({
            type: "string"
        }),
        warehouse_address: t.String({
            type: "string"
        }),
        phone_number_warehouse: t.String({
            type: "string"
        })
    })
});
routerWarehouse.patch("/:id", ({ params: { id }, body }) => UpdateWarehouse(id as TypeId, body as WarehouseCreate), {
    body: t.Object({
        level_id: t.String({
            type: "string"
        }),
        name_warehouse: t.String({
            type: "string"
        }),
        username: t.String({
            type: "string"
        }),
        password: t.String({
            type: "string"
        }),
        warehouse_address: t.String({
            type: "string"
        }),
        phone_number_warehouse: t.String({
            type: "string"
        })
    })
});

export default routerWarehouse;