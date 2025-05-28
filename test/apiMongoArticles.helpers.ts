import { agent } from "supertest";
import { app } from "../src/app";
import { storage } from "../src/components/storage";
import type { AddArticleDto, Article, EditArticleDto } from "../src/schemas";

export { services } from "../src/services";

export const dto = {
  addArticle: {
    description: "description",
    image: {
      contentUrl: "test/assets/articles/image.jpg",
      name: "image.jpg",
    },
    name: "name",
    text: "text",
  },
  editArticle: {
    description: "new description",
    image: {
      contentUrl: "test/assets/articles/new-image.jpg",
      name: "new-image.jpg",
    },
    name: "new name",
    text: "new text",
  },
};

export const spies = {
  storage: {
    client: {
      fPutObject: jest
        .spyOn(storage.client, "fPutObject")
        .mockResolvedValue({} as ReturnType<typeof storage.client.fPutObject>),
      removeObject: jest.spyOn(storage.client, "removeObject").mockResolvedValue(),
    },
  },
};

export async function getArticles() {
  return agent(app).get("/api/mongo-articles");
}

export async function addArticle(
  dto?: Partial<
    Omit<AddArticleDto, "image"> & {
      image: {
        contentUrl: string;
        name: string;
      };
    }
  >,
) {
  const request = agent(app).post("/api/mongo-articles");

  if (dto) {
    if (dto.description !== undefined) {
      request.field("description", dto.description);
    }

    if (dto.image !== undefined) {
      request.attach("image", dto.image.contentUrl, {
        filename: dto.image.name,
      });
    }

    if (dto.name !== undefined) {
      request.field("name", dto.name);
    }

    if (dto.text !== undefined) {
      request.field("text", dto.text);
    }
  }

  return request;
}

export function getInsertedArticle(response: Article[], _id: Article["_id"]) {
  return response.filter((article: Article) => {
    return article._id === _id;
  });
}

export function getInsertedId(location?: string) {
  return String(location?.match(/([^/]+)/g)?.[2]);
}

export async function getArticle(_id: Article["_id"]) {
  return agent(app).get(`/api/mongo-articles/${_id}`);
}

export async function editArticle(
  _id: Article["_id"],
  dto?: Partial<
    Omit<EditArticleDto, "image"> & {
      image: {
        contentUrl: string;
        name: string;
      };
    }
  >,
) {
  const request = agent(app).put(`/api/mongo-articles/${_id}`);

  if (dto) {
    if (dto.description !== undefined) {
      request.field("description", dto.description);
    }

    if (dto.image !== undefined) {
      request.attach("image", dto.image.contentUrl, {
        filename: dto.image.name,
      });
    }

    if (dto.name !== undefined) {
      request.field("name", dto.name);
    }

    if (dto.text !== undefined) {
      request.field("text", dto.text);
    }
  }

  return request;
}

export async function removeArticle(_id: Article["_id"]) {
  return agent(app).delete(`/api/mongo-articles/${_id}`);
}

export function evaluateResponse(response: Article | Article[]) {
  return JSON.parse(
    JSON.stringify(response)
      .replace(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g,
        "00000000-0000-0000-0000-000000000000",
      )
      .replace(
        /(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])/g,
        "1970-01-01T00:00:00.000Z",
      ),
  );
}

export function evaluateStorageClientFPutObjectSpy() {
  return JSON.parse(
    JSON.stringify(spies.storage.client.fPutObject.mock.calls[0])
      .replace(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g,
        "00000000-0000-0000-0000-000000000000",
      )
      .replace(/[a-f0-9]{32}/g, "00000000000000000000000000000000"),
  );
}

export function evaluateStorageClientRemoveObjectSpy() {
  return JSON.parse(
    JSON.stringify(spies.storage.client.removeObject.mock.calls[0]).replace(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g,
      "00000000-0000-0000-0000-000000000000",
    ),
  );
}
