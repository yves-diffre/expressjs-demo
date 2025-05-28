import { JSDOM } from "jsdom";
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

export async function displayArticles() {
  return agent(app).get("/mongo-articles");
}

export async function displayAddArticle() {
  return agent(app).get("/mongo-articles/add-article");
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
  const request = agent(app).post("/mongo-articles/add-article");

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

  return request.redirects(1);
}

export function getInsertedId(url: string) {
  return String(url.match(/([^/]+)/g)?.[3]);
}

export async function displayArticle(_id: Article["_id"]) {
  return agent(app).get(`/mongo-articles/${_id}`);
}

export async function displayEditArticle(_id: Article["_id"]) {
  return agent(app).get(`/mongo-articles/${_id}/edit-article`);
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
  const request = agent(app).post(`/mongo-articles/${_id}/edit-article`);

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

  return request.redirects(1);
}

export async function removeArticle(_id: Article["_id"]) {
  return agent(app).post(`/mongo-articles/${_id}/remove-article`).redirects(1);
}

export function evaluatePage(page: string, _id?: Article["_id"]) {
  const dom = new JSDOM(page);
  const document = dom.window.document;

  const data = document.querySelector("main > ul");
  if (data) {
    data.innerHTML = data.innerHTML.replace(/on (.*)/g, "on 1/1/1970");
  }

  const previews = document.querySelector("main > nav");
  if (previews) {
    const preview = previews.querySelector(`article[data-id='${_id}']`);
    previews.innerHTML = preview ? preview.outerHTML : "";
  }

  const content = dom.serialize();
  return content.replace(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g,
    "00000000-0000-0000-0000-000000000000",
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
