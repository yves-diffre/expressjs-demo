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

export async function signUp(dto?: Partial<SignUpDto>) {
  return agent(app).post("/api/auth/sign-up").send(dto);
}

export async function signIn(dto?: Partial<SignInDto>) {
  return agent(app).post("/api/auth/sign-in").send(dto);
}

export async function signOut() {
  return agent(app).post("/api/auth/sign-out").send();
}
