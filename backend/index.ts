import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();
const env = config();
const port = Number(env.PORT) || 8888;
const users = new Array<{id: number, online: boolean}>(100).fill({ id: 0, online: false }).map((user, i) => (
  {
    ...user,
    ...{ id: i },
  }
));

router.get('/', ctx => {
  ctx.response.body = "--- Deno User Server 🍺 ---";
})

router.options("/sse", oakCors());
router.get("/sse", (ctx) => {
  console.log("Someone is connected to /sse");
  const target = ctx.sendEvents({ headers: new Headers([["access-control-allow-origin", "*"]]) });
  const statusUpdate = () => {
    const index = Math.floor(Math.random() * users.length);
    users[index].online = !users[index].online;
    target.dispatchMessage(users[index]);
  }
  const intervalStatus = setInterval(statusUpdate, 100);
  target.addEventListener("close", () => {
    console.log("Someone is disconnected");
    clearInterval(intervalStatus);
  })
});

router.get("/users/:id", ctx => {
  const id = ctx.params["id"];
  console.log("Get user", id);
  ctx.response.body = { id, username: `name-${id}`, online: false };
});

app.use(oakCors({
  origin: /^.+localhost:(1234|3000)$/,
  optionsSuccessStatus: 200,
}));

app.use(router.routes());
console.log(`--- Deno User server is started on port ${port} ---`);
await app.listen({ port });
