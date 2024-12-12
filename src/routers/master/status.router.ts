import { Elysia, t } from "elysia";
import { GetAllStatus, CreateStatus, UpdateStatus, DeleteStatus } from "../../controllers/master/status.controller";


const routerStatus = new Elysia({prefix: "/status"});

routerStatus.get("/", () => GetAllStatus());
routerStatus.post("/", ({ body }) => CreateStatus(body as StatusCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerStatus.patch("/:id", ({ params: { id }, body }) => UpdateStatus(id as TypeId, body as StatusCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerStatus.delete("/:id", ({ params: { id } }) => DeleteStatus(id as TypeId));

export default routerStatus;