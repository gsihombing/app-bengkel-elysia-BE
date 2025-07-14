import { Elysia, t } from "elysia";
import { GetProfile, UpdateProfile } from "../../controllers/gerai/profile.controller";

const routerProfile = new Elysia({ prefix: "/profile" });

routerProfile.get("/", ({query}) => GetProfile(query));
routerProfile.patch("/", ({ query, body }) => UpdateProfile(query.id as TypeId, body as WarehouseCreate), {
    body: t.Object({
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

export default routerProfile;