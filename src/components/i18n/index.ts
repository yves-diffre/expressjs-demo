import i18n from "i18next";
import Backend, { type FsBackendOptions } from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import { env } from "../env";
import { addFormatters } from "./formatters";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init<FsBackendOptions>({
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
    debug: env.app.debug,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    preload: ["en"],
  });
addFormatters(i18n);

export { i18n };
