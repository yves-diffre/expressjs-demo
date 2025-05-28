import crypto from "node:crypto";
import fs from "node:fs";
import { expect, test } from "@playwright/test";
import type { Article } from "../src/schemas";

test("apiPostgresArticles", async ({ browserName, request }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  let _id: Article["_id"];

  await test.step("should add an article", async () => {
    const addArticleResponse = await request.post("/api/postgres-articles", {
      multipart: (() => {
        const dto = new FormData();
        dto.append("description", "description");
        dto.append(
          "image",
          new File([fs.readFileSync("e2e/assets/articles/image.jpg")], "image.jpg"),
        );
        dto.append("name", `name (${browserName})`);
        dto.append("text", "text");
        return dto;
      })(),
    });
    expect.soft(addArticleResponse.status()).toBe(201);
    expect.soft(await addArticleResponse.text()).toMatchSnapshot();
    _id = String(addArticleResponse.headers().location?.match(/([^/]+)/g)?.[2]);
  });

  await test.step("should get articles", async () => {
    const getArticlesResponse = await request.get("/api/postgres-articles");
    expect.soft(getArticlesResponse.status()).toBe(200);
    expect
      .soft(
        evaluate(
          (await getArticlesResponse.json()).filter((article: Article) => {
            return article._id === _id;
          }),
        ),
      )
      .toMatchSnapshot();
  });

  await test.step("should get an article", async () => {
    const getArticleResponse = await request.get(`/api/postgres-articles/${_id}`);
    expect.soft(getArticleResponse.status()).toBe(200);
    expect.soft(evaluate(await getArticleResponse.json())).toMatchSnapshot();
  });

  await test.step("should edit an article", async () => {
    const editArticleResponse = await request.put(`/api/postgres-articles/${_id}`, {
      multipart: (() => {
        const dto = new FormData();
        dto.append("description", "new description");
        dto.append(
          "image",
          new File([fs.readFileSync("e2e/assets/articles/new-image.jpg")], "new-image.jpg"),
        );
        dto.append("name", `new name (${browserName})`);
        dto.append("text", "new text");
        return dto;
      })(),
    });
    expect.soft(editArticleResponse.status()).toBe(204);
    expect.soft(await editArticleResponse.text()).toMatchSnapshot();
  });

  await test.step("should remove an article", async () => {
    const removeArticleResponse = await request.delete(`/api/postgres-articles/${_id}`);
    expect.soft(removeArticleResponse.status()).toBe(204);
    expect.soft(await removeArticleResponse.text()).toMatchSnapshot();
  });
});

function evaluate(response: Article | Article[]) {
  return JSON.stringify(response)
    .replace(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g,
      "00000000-0000-0000-0000-000000000000",
    )
    .replace(
      /(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])/g,
      "1970-01-01T00:00:00.000Z",
    );
}
