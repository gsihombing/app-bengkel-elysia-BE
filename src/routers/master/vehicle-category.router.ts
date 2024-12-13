import { Elysia, t } from "elysia";
import { CreateVehicleCategory, DeleteVehicleCategory, GetAllVehicleCategory, UpdateVehicleCategory } from "../../controllers/master/vehicle-category.controller";


const routerVehicleCategory = new Elysia({prefix: "/vehicle-category"});

routerVehicleCategory.get("/", () => GetAllVehicleCategory());
routerVehicleCategory.post("/", ({ body }) => CreateVehicleCategory(body as VehicleCategoryCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerVehicleCategory.patch("/:id", ({ params: { id }, body }) => UpdateVehicleCategory(id as TypeId, body as VehicleCategoryCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerVehicleCategory.delete("/:id", ({ params: { id } }) => DeleteVehicleCategory(id as TypeId));

export default routerVehicleCategory;