import { Elysia } from "elysia";
import { GetAllStatus } from "../../controllers/master/status.controller";


const routerStatus = new Elysia({prefix: "/status"});

routerStatus.get("/", () => GetAllStatus());

export default routerStatus;