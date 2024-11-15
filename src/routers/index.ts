import { Elysia } from "elysia";
import routerBooks from "./global/books.router";


const routerIndex = new Elysia();

// Global Router
routerIndex.group("/global", (allRouter) => allRouter.use(routerBooks))

// Admin Router
// routerIndex.group("/admin", (allRouter) => allRouter.use(routerIndex))

// User Router
// routerIndex.group("/user", (allRouter) => allRouter.use(routerIndex))

export default routerIndex;