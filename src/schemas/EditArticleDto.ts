import { Article } from "./Article";

export type EditArticleDto = Pick<Article, "description" | "name" | "text"> & {
  image?: Express.File;
};

export const EditArticleDto = {
  type: "object",
  additionalProperties: false,
  properties: {
    description: {
      ...Article.properties.description,
      errorMessage: "schemas.EditArticleDto.errorMessage.description",
    },
    image: {
      contentMediaType: "image/jpeg",
      errorMessage: "schemas.EditArticleDto.errorMessage.image",
    },
    name: {
      ...Article.properties.name,
      errorMessage: "schemas.EditArticleDto.errorMessage.name",
    },
    text: {
      ...Article.properties.text,
      errorMessage: "schemas.EditArticleDto.errorMessage.text",
    },
  },
  required: ["description", "name", "text"],
  errorMessage: {
    _: "schemas.EditArticleDto.errorMessage._",
    required: {
      description: "schemas.EditArticleDto.errorMessage.description",
      name: "schemas.EditArticleDto.errorMessage.name",
      text: "schemas.EditArticleDto.errorMessage.text",
    },
  },
};
