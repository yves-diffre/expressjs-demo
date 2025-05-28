import crypto from "node:crypto";
import { UUID } from "mongodb";
import { UnknownEntityError, databases } from "../components/databases";
import { uploader } from "../components/uploader";
import { ValidationError, validator } from "../components/validator";
import { AddArticleDto, type Article, EditArticleDto } from "../schemas";

type ArticleDocument = Omit<Article, "_id" | "dateCreated" | "dateModified"> & {
  _id: UUID;
  dateCreated: Date;
  dateModified?: Date;
};

function validateId(_id: Article["_id"]) {
  return UUID.isValid(_id);
}

function generateImageObjectName(file: Express.File) {
  return uploader.generateObjectName(`/uploads/articles/${crypto.randomUUID()}-image`, file);
}

async function getArticles() {
  return databases.client.mongo
    .db()
    .collection<ArticleDocument>("articles")
    .find()
    .sort({
      dateCreated: -1,
    })
    .toArray();
}

const validateAddArticleDto = validator.compile(AddArticleDto);
async function addArticle(dto: AddArticleDto) {
  const valid = validateAddArticleDto(dto);
  if (!valid) {
    throw new ValidationError(validateAddArticleDto.errors);
  }

  const values = {
    ...dto,
    _id: new UUID(),
    dateCreated: new Date(),
    image: generateImageObjectName(dto.image),
  };
  const result = await databases.client.mongo
    .db()
    .collection<ArticleDocument>("articles")
    .insertOne(values);

  await uploader.put(values.image, dto.image);

  return {
    _id: result.insertedId,
  };
}

async function getArticle(_id: Article["_id"]) {
  if (!validateId(_id)) {
    throw new UnknownEntityError();
  }

  const article = await databases.client.mongo
    .db()
    .collection<ArticleDocument>("articles")
    .findOne({
      _id: new UUID(_id),
    });
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
  await databases.client.mongo
    .db()
    .collection<ArticleDocument>("articles")
    .updateOne(
      {
        _id: new UUID(_id),
      },
      {
        $set: values,
      },
    );

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

  await databases.client.mongo
    .db()
    .collection<ArticleDocument>("articles")
    .deleteOne({
      _id: new UUID(_id),
    });

  await uploader.remove(article.image);

  return {
    _id,
  };
}

export const mongoArticlesServices = {
  getArticles,
  addArticle,
  getArticle,
  editArticle,
  removeArticle,
};
