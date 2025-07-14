import { Elysia, t } from "elysia";
import { Dashboard } from "../../controllers/gerai/dashboard.controller";

const routerDashboard = new Elysia({ prefix: "/dashboard" });

routerDashboard.get("/", ({query}) => Dashboard(query));

export default routerDashboard;