import { Elysia, t } from "elysia";
import { CreateLevel, DeleteLevel, GetAllLevel, UpdateLevel } from "../../controllers/master/level.controller";


const routerLevel = new Elysia({prefix: "/level"});

routerLevel.get("/", () => GetAllLevel());
routerLevel.post("/", ({ body }) => CreateLevel(body as LevelCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerLevel.patch("/:id", ({ params: { id }, body }) => UpdateLevel(id as TypeId, body as LevelCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerLevel.delete("/:id", ({ params: { id } }) => DeleteLevel(id as TypeId));

export default routerLevel;