import { Elysia, t } from "elysia";
import { GetAllVehicleMerk, CreateVehicleMerk, UpdateVehicleMerk, DeleteVehicleMerk } from "../../controllers/master/vehicle-merk.controller";


const routerVehicleMerk = new Elysia({prefix: "/vehicle-merk"});

routerVehicleMerk.get("/", () => GetAllVehicleMerk());
routerVehicleMerk.post("/", ({ body }) => CreateVehicleMerk(body as VehicleMerkCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerVehicleMerk.patch("/:id", ({ params: { id }, body }) => UpdateVehicleMerk(id as TypeId, body as VehicleMerkCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerVehicleMerk.delete("/:id", ({ params: { id } }) => DeleteVehicleMerk(id as TypeId));

export default routerVehicleMerk;