import { JSDOM } from "jsdom";
import { agent } from "supertest";
import { app } from "../src/app";
import type { SignInDto, SignUpDto } from "../src/schemas";

export { services } from "../src/services";

export const dto = {
  signIn: {
    email: "email@example.org",
    password: "password",
  },
  signUp: {
    email: "email@example.org",
    password: "password",
  },
};

export async function displaySignUp() {
  return agent(app).get("/auth/sign-up");
}

export async function signUp(dto?: Partial<SignUpDto>) {
  return agent(app).post("/auth/sign-up").send(dto).redirects(1);
}

export async function displaySignIn() {
  return agent(app).get("/auth/sign-in");
}

export async function signIn(dto?: Partial<SignInDto>) {
  return agent(app).post("/auth/sign-in").send(dto).redirects(1);
}

export async function signOut() {
  return agent(app).post("/auth/sign-out").send().redirects(1);
}

export function evaluatePage(page: string) {
  const dom = new JSDOM(page);
  const content = dom.serialize();
  return content;
}
