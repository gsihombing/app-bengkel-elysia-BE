import { Elysia } from "elysia";
import { Logestic } from "logestic";
import routerIndex from "./routers/index";

const app = new Elysia()

// Logger template
// app.use(Logestic.preset('common'));
// app.use(Logestic.preset('commontz'));
app.use(Logestic.preset('fancy'));

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

