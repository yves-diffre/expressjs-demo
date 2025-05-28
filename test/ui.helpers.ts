import { JSDOM } from "jsdom";
import { agent } from "supertest";
import { app } from "../src/app";

export { services } from "../src/services";

export async function handleError() {
  return agent(app).get("/404");
}

export function evaluatePage(page: string) {
  const dom = new JSDOM(page);
  const content = dom.serialize();
  return content;
}
