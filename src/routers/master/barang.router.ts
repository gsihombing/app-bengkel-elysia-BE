import { Elysia, t } from "elysia";
import { CreateBarang, DeleteBarang, GetAllBarang, UpdateBarang } from "../../controllers/master/barang.controller";


const routerBarang = new Elysia({ prefix: "/barang" });

routerBarang.get("/", ({ query }) => GetAllBarang(query));
routerBarang.post("/", ({ body }) => CreateBarang(body as BarangCreate), {
    body: t.Object({
        category_vehicle_id: t.String({
            type: "string",
            required: true
        }),
        name_barang: t.String({
            type: "string",
            required: true
        }),
        description_barang: t.String({
            type: "string"
        }),
        price: t.Any({
            type: "any",
            required: true
        }),
        point: t.Numeric({
            type: "numeric",
            default: 0,
            required: true
        })
    })
});
routerBarang.patch("/:id", ({ params: { id }, body }) => UpdateBarang(id as TypeId, body as BarangCreate), {
    body: t.Object({
        category_vehicle_id: t.String({
            type: "string"
        }),
        name_barang: t.String({
            type: "string"
        }),
        description_barang: t.String({
            type: "string"
        }),
        price: t.Any({
            type: "any"
        }),
        point: t.Numeric({
            type: "numeric",
            default: 0
        })
    })
});
routerBarang.delete("/:id", ({ params: { id } }) => DeleteBarang(id as TypeId));
export default routerBarang;