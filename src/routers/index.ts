import { Elysia } from "elysia";
import routerMaster from "./master/status.router";


const routerIndex = new Elysia();

// Master Admin Router
routerIndex.group("/master", (allRouter) => allRouter.use(routerMaster))

// Admin Router
// routerIndex.group("/admin", (allRouter) => allRouter.use(routerIndex))

// User Router
// routerIndex.group("/user", (allRouter) => allRouter.use(routerIndex))

export default routerIndex;