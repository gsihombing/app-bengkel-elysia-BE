import { Elysia } from "elysia";
import routerMasterStatus from "./master/status.router";
import routerMasterMember from "./master/member.router";


const routerIndex = new Elysia();

// Master Admin Router
routerIndex.group("/master", (allRouter) => allRouter.use(routerMasterStatus))
routerIndex.group("/master", (allRouter) => allRouter.use(routerMasterMember))

// Admin Router
// routerIndex.group("/admin", (allRouter) => allRouter.use(routerIndex))

// User Router
// routerIndex.group("/user", (allRouter) => allRouter.use(routerIndex))

export default routerIndex;