import crypto from "node:crypto";
import { UnknownEntityError, databases } from "../components/databases";
import { uploader } from "../components/uploader";
import { ValidationError, validator } from "../components/validator";
import { AddArticleDto, type Article, EditArticleDto } from "../schemas";

function validateId(_id: Article["_id"]) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(_id);
}

function generateImageObjectName(file: Express.File) {
  return uploader.generateObjectName(`/uploads/articles/${crypto.randomUUID()}-image`, file);
}

async function getArticles() {
  return (
    await databases.client.postgres.query<Article>({
      text: `
        SELECT
          *
        FROM
          "app"."articles"
        ORDER BY
          "dateCreated" DESC
      `,
    })
  ).rows;
}

const validateAddArticleDto = validator.compile(AddArticleDto);
async function addArticle(dto: AddArticleDto) {
  const valid = validateAddArticleDto(dto);
  if (!valid) {
    throw new ValidationError(validateAddArticleDto.errors);
  }

  const values = {
    ...dto,
    _id: crypto.randomUUID(),
    dateCreated: new Date(),
    image: generateImageObjectName(dto.image),
  };
  const result = (
    await databases.client.postgres.query<{
      insertedId: string;
    }>({
      text: `
        INSERT INTO
          "app"."articles" (
            "_id",
            "dateCreated",
            "description",
            "image",
            "name",
            "text"
          )
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING
          "_id" AS "insertedId"
      `,
      values: [
        values._id,
        values.dateCreated,
        values.description,
        values.image,
        values.name,
        values.text,
      ],
    })
  ).rows[0];

  await uploader.put(values.image, dto.image);

  return {
    _id: result?.insertedId,
  };
}

async function getArticle(_id: Article["_id"]) {
  if (!validateId(_id)) {
    throw new UnknownEntityError();
  }

  const article = (
    await databases.client.postgres.query<Article>({
      text: `
        SELECT
          *
        FROM
          "app"."articles"
        WHERE
          "_id" = $1
      `,
      values: [_id],
    })
  ).rows[0];
  if (!article) {
    throw new UnknownEntityError();
  }

  return article;
}

const validateEditArticleDto = validator.compile(EditArticleDto);
async function editArticle(_id: Article["_id"], dto: EditArticleDto) {
  if (!validateId(_id)) {
    throw new UnknownEntityError();
  }

  const valid = validateEditArticleDto(dto);
  if (!valid) {
    throw new ValidationError(validateEditArticleDto.errors);
  }

  const article = await getArticle(_id);

  const values = {
    ...dto,
    dateModified: new Date(),
    image: dto.image ? generateImageObjectName(dto.image) : article.image,
  };
  await databases.client.postgres.query<Article>({
    text: `
      UPDATE "app"."articles"
      SET
        "dateModified" = $2,
        "description" = $3,
        "image" = $4,
        "name" = $5,
        "text" = $6
      WHERE
        "_id" = $1
    `,
    values: [_id, values.dateModified, values.description, values.image, values.name, values.text],
  });

  if (dto.image && values.image !== article.image) {
    await uploader.put(values.image, dto.image);
    await uploader.remove(article.image);
  }

  return {
    _id,
  };
}

async function removeArticle(_id: Article["_id"]) {
  if (!validateId(_id)) {
    throw new UnknownEntityError();
  }

  const article = await getArticle(_id);

  await databases.client.postgres.query<Article>({
    text: `
      DELETE FROM "app"."articles"
      WHERE
        "_id" = $1
    `,
    values: [_id],
  });

  await uploader.remove(article.image);

  return {
    _id,
  };
}

export const postgresArticlesServices = {
  getArticles,
  addArticle,
  getArticle,
  editArticle,
  removeArticle,
};
