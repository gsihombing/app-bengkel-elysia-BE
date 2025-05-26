import { Elysia, t } from "elysia";
import { CreateUsers, DeleteUsers, GetAllUsers, UpdateUsers } from "../../controllers/master/users.controller";


const routerUsers = new Elysia({prefix: "/users"});

routerUsers.get("/", ({ query }) => GetAllUsers( query ));
routerUsers.post("/", ({ body }) => CreateUsers(body as UsersCreate), {
    body: t.Object({
        status_id: t.String({
            type: "string",
            required: true
        }),
        member_id: t.String({
            type: "string",
            required: true
        }),
        vehicle_year_id: t.String({
            type: "string",
            required: true
        }),
        vehicle_merk_id: t.String({
            type: "string",
            required: true
        }),
        vehicle_type_id: t.String({
            type: "string",
            required: true
        }),
        no_police: t.String({
            type: "string",
            required: true
        }),
        name: t.String({
            type: "string"
        }),
        address: t.String({
            type: "string"
        }),
        phone_number: t.String({
            type: "string",
            required: true
        })
    })
})
routerUsers.patch("/:nopol", ({ params: { nopol }, body }) => UpdateUsers(nopol as TypeId, body as UsersCreate), {
    body: t.Object({
        status_id: t.String({
            type: "string",
            required: true
        }),
        member_id: t.String({
            type: "string",
            required: true
        }),
        vehicle_year_id: t.String({
            type: "string",
            required: true
        }),
        vehicle_merk_id: t.String({
            type: "string",
            required: true
        }),
        vehicle_type_id: t.String({
            type: "string",
            required: true
        }),
        no_police: t.String({
            type: "string",
            required: true
        }),
        name: t.String({
            type: "string"
        }),
        address: t.String({
            type: "string"
        }),
        phone_number: t.String({
            type: "string",
            required: true
        })
    })
});
routerUsers.delete("/:nopol", ({ params: { nopol } }) => DeleteUsers(nopol as TypeId));
export default routerUsers;