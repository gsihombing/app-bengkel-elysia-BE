import { Elysia } from "elysia";
import routerMasterStatus from "./master/status.router";
import routerMasterMember from "./master/member.router";
import routerVehicleYear from "./master/vehicle-year.router";


const routerIndex = new Elysia();

// Master Admin Router
routerIndex.group("/master", (allRouter) => allRouter.use(routerMasterStatus))
routerIndex.group("/master", (allRouter) => allRouter.use(routerMasterMember))
routerIndex.group("/master", (allRouter) => allRouter.use(routerVehicleYear))

// Admin Router
// routerIndex.group("/admin", (allRouter) => allRouter.use(routerIndex))

// User Router
// routerIndex.group("/user", (allRouter) => allRouter.use(routerIndex))

export default routerIndex;