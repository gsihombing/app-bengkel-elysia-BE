import { Elysia, t } from "elysia";
import { GetAllStatus, CreateStatus } from "../../controllers/master/status.controller";


const routerStatus = new Elysia({prefix: "/status"});

routerStatus.get("/", () => GetAllStatus());
routerStatus.post("/", ({ body }) => CreateStatus(body as { name: string }), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});

export default routerStatus;