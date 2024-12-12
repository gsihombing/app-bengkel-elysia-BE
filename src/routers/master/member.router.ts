import { Elysia, t } from "elysia";
import { GetAllMember, CreateMember, UpdateMember, DeleteMember } from "../../controllers/master/member.controller";

const routerMember = new Elysia({prefix: "/member"});

routerMember.get("/", () => GetAllMember());
routerMember.post("/", ({ body }) => CreateMember(body as MemberCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerMember.patch("/:id", ({ params: { id }, body }) => UpdateMember(id as TypeId, body as MemberCreate), {
    body: t.Object({
        name: t.String({
            type: "string",
            required: true
        })
    })
});
routerMember.delete("/:id", ({ params: { id } }) => DeleteMember(id as TypeId));

export default routerMember;