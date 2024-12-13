import { Elysia, t } from "elysia";
import { GetAllVehicleYear, CreateVehicleYear, UpdateVehicleYear, DeleteVehicleYear } from "../../controllers/master/vehicle-year.controller";


const routerVehicleYear = new Elysia({prefix: "/vehicle-year"});

routerVehicleYear.get("/", () => GetAllVehicleYear());
routerVehicleYear.post("/", ({ body }) => CreateVehicleYear(body as VehicleYearCreate), {
    body: t.Object({
        year: t.String({
            type: "string",
            required: true
        })
    })
});
routerVehicleYear.patch("/:id", ({ params: { id }, body }) => UpdateVehicleYear(id as TypeId, body as VehicleYearCreate), {
    body: t.Object({
        year: t.String({
            type: "string",
            required: true
        })
    })
});
routerVehicleYear.delete("/:id", ({ params: { id } }) => DeleteVehicleYear(id as TypeId));

export default routerVehicleYear;