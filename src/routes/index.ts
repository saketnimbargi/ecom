import { Application } from "express";
import v1 from "./v1";
export class Routes {
  public routesInit(app: Application): void {
    app.use("/ecom/api/v1", v1);
  }
}
