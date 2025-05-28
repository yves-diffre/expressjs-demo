import { authServices } from "./auth";
import { contactServices } from "./contact";
import { mongoArticlesServices } from "./mongoArticles";
import { postgresArticlesServices } from "./postgresArticles";

export const services = {
  auth: authServices,
  contact: contactServices,
  mongoArticles: mongoArticlesServices,
  postgresArticles: postgresArticlesServices,
};
