import { Elysia } from "elysia";
import { Logestic } from "logestic";
import routerIndex from "./routers/index";
import {cron as cronJob} from"@elysiajs/cron";
import { StatusAll } from "./models/master/status.models";
import prisma from "./lib/prisma.lib";

const app = new Elysia()

// Logger template
// app.use(Logestic.preset('common'));
// app.use(Logestic.preset('commontz'));
app.use(Logestic.preset('fancy'));

// Cron Job
app.use(cronJob({
  name: "cron-job",
  pattern: "*/10 * * * * *", // run every 10 seconds
  timezone: "Asia/Jakarta", // timezone
  run: async () => {
    const dataAll: Status = await StatusAll(); // contoh menjalankan query
    const dataAl1l: any = await prisma.status.findMany(); // contoh menjalankan query
    console.log(dataAl1l, "dari prisma") // contoh hasil menjalankan query
    console.log("Cron Job is running! 10 seconds")
  }
}));

app.get("/", () => {
  return {
    success: true,
    message: "Hello Developer Elysia"
  }
})

// Send all request to file Router
app.group("", (allRouter) => allRouter.use(routerIndex))

app.onError(({ code }) => {
  if (code === 'NOT_FOUND') {
      return {
        success: false,
        message: "Route not found :("
      }
  }
})


app.listen(process.env.PORT, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});

