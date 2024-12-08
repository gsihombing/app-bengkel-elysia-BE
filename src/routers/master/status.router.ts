import { Elysia, t } from "elysia";
import { GetAllStatus, CreateStatus, UpdateStatus } from "../../controllers/master/status.controller";


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

export default routerStatus;