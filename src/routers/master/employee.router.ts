import { Elysia, t } from "elysia";
import { CreateEmployee, DeleteEmployee, GetAllEmployee, UpdateEmployee } from "../../controllers/master/employee.controller";


const routerEmployee = new Elysia({prefix: "/employee"});

routerEmployee.get("/", ({ query }) => GetAllEmployee( query ));
routerEmployee.post("/", ({ body }) => CreateEmployee(body as EmployeeCreate), {
    body: t.Object({
        status_id: t.String({
            type: "string",
            required: true
        }),
        name: t.String({
            type: "string",
            required: true
        }),
        address: t.String({
            type: "string"
        }),
        phone_number: t.String({
            type: "string"
        })
    })
});
routerEmployee.patch("/:id", ({ params: { id }, body }) => UpdateEmployee(id as TypeId, body as EmployeeCreate), {
    body: t.Object({
        status_id: t.String({
            type: "string"
        }),
        name: t.String({
            type: "string"
        }),
        point: t.Numeric({
            type: "number",
            required: true
        }),
        address: t.String({
            type: "string"
        }),
        phone_number: t.String({
            type: "string"
        })
    })
});
routerEmployee.delete("/:id", ({ params: { id } }) => DeleteEmployee(id as TypeId));

export default routerEmployee;