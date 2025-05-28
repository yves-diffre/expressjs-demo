import { Article } from "./Article";

export type AddArticleDto = Pick<Article, "description" | "name" | "text"> & {
  image: Express.File;
};

export const AddArticleDto = {
  type: "object",
  additionalProperties: false,
  properties: {
    description: {
      ...Article.properties.description,
      errorMessage: "schemas.AddArticleDto.errorMessage.description",
    },
    image: {
      contentMediaType: "image/jpeg",
      errorMessage: "schemas.AddArticleDto.errorMessage.image",
    },
    name: {
      ...Article.properties.name,
      errorMessage: "schemas.AddArticleDto.errorMessage.name",
    },
    text: {
      ...Article.properties.text,
      errorMessage: "schemas.AddArticleDto.errorMessage.text",
    },
  },
  required: ["description", "image", "name", "text"],
  errorMessage: {
    _: "schemas.AddArticleDto.errorMessage._",
    required: {
      description: "schemas.AddArticleDto.errorMessage.description",
      image: "schemas.AddArticleDto.errorMessage.image",
      name: "schemas.AddArticleDto.errorMessage.name",
      text: "schemas.AddArticleDto.errorMessage.text",
    },
  },
};
