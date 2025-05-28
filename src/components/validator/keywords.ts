import type { Ajv } from "ajv";
import ajvKeywords from "ajv-keywords";

export function addKeywords(ajv: Ajv) {
  ajvKeywords(ajv);

  ajv.removeKeyword("contentMediaType").addKeyword({
    keyword: "contentMediaType",
    compile: (schema) => {
      return (data: Express.File, context) => {
        return schema.includes(data.mimetype);
      };
    },
  });
}
