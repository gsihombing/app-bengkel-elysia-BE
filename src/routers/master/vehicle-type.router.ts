import { Elysia, t } from "elysia";
import { GetAllVehicleType, CreateVehicleType, UpdateVehicleType, DeleteVehicleType } from "../../controllers/master/vehicle-type.controller";


const routerVehicleType = new Elysia({prefix: "/vehicle-type"});

routerVehicleType.get("/", () => GetAllVehicleType());
routerVehicleType.post("/", ({ body }) => CreateVehicleType(body as VehicleTypeCreate), {
    body: t.Object({
        vehicle_category_id: t.Numeric({
            type: "number",
            required: true
        }),
        name: t.String({
            type: "string",
            required: true
        })
    })
});
// routerVehicleType.patch("/:id", ({ params: { id }, body }) => UpdateVehicleType(id as TypeId, body as VehicleTypeCreate), {
//     body: t.Object({
//         name: t.String({
//             type: "string",
//             required: true
//         })
//     })
// });
// routerVehicleType.delete("/:id", ({ params: { id } }) => DeleteVehicleType(id as TypeId));

export default routerVehicleType;