import { agent } from "supertest";
import { app } from "../src/app";

export { services } from "../src/services";

export async function handleError() {
  return agent(app).get("/api/404");
}
