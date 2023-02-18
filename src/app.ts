import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;
  private PORT: Number;
  constructor() {
    const app: express.Application = express();
    this.app = app;
    this.PORT = 8000;
  }

  private setRoute() {
    this.app.use("/cats", catsRouter);
  }

  private setMiddleware() {
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware");
      next();
    });

    this.app.use(express.json());

    this.setRoute();

    this.app.use((req, res) => {
      res.send({ error: "[404] 해당 페이지를 찾을 수 없습니다." });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(this.PORT, () => {
      console.log(`Server is on ${this.PORT}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
