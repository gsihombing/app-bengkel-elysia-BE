import { Elysia } from "elysia";
import routerMasterStatus from "./master/status.router";
import routerMasterMember from "./master/member.router";
import routerVehicleYear from "./master/vehicle-year.router";
import routerVehicleMerk from "./master/vehicle-merk.router";
import routerVehicleCategory from "./master/vehicle-category.router";
import routerVehicleType from "./master/vehicle-type.router";
import routerLevel from "./master/level.router";
import routerEmployee from "./master/employee.router";
import routerUsers from "./master/users.router";
import routerBarang from "./master/barang.router";
import routerWarehouse from "./master/warehouse.router";


const routerIndex = new Elysia();

// Master Admin Router
routerIndex.group("/master", (allRouter) => allRouter.use(routerMasterStatus))
routerIndex.group("/master", (allRouter) => allRouter.use(routerMasterMember))
routerIndex.group("/master", (allRouter) => allRouter.use(routerVehicleYear))
routerIndex.group("/master", (allRouter) => allRouter.use(routerVehicleMerk))
routerIndex.group("/master", (allRouter) => allRouter.use(routerVehicleCategory))
routerIndex.group("/master", (allRouter) => allRouter.use(routerVehicleType))
routerIndex.group("/master", (allRouter) => allRouter.use(routerLevel))
routerIndex.group("/master", (allRouter) => allRouter.use(routerEmployee))
routerIndex.group("/master", (allRouter) => allRouter.use(routerUsers))
routerIndex.group("/master", (allRouter) => allRouter.use(routerBarang))
// routerIndex.group("/master", (allRouter) => allRouter.use(routerWarehouse))

// Admin Router
// routerIndex.group("/admin", (allRouter) => allRouter.use(routerIndex))

// User Router
// routerIndex.group("/user", (allRouter) => allRouter.use(routerIndex))

export default routerIndex;