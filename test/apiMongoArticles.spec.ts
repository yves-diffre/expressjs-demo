import {
  addArticle,
  dto,
  editArticle,
  evaluateResponse,
  evaluateStorageClientFPutObjectSpy,
  evaluateStorageClientRemoveObjectSpy,
  getArticle,
  getArticles,
  getInsertedArticle,
  getInsertedId,
  removeArticle,
  services,
  spies,
} from "./apiMongoArticles.helpers";

afterEach(() => {
  spies.storage.client.fPutObject.mockClear();
  spies.storage.client.removeObject.mockClear();
});

test("should get articles", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.header.location);
  const getArticlesResponse = await getArticles();
  expect(getArticlesResponse.status).toBe(200);
  expect(evaluateResponse(getInsertedArticle(getArticlesResponse.body, _id))).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not add an article when data are missing", async () => {
  const addArticleResponse = await addArticle(undefined);
  expect(addArticleResponse.status).toBe(400);
  expect(addArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when validation failed", async () => {
  const addArticleResponse = await addArticle({
    description: "",
    name: "",
    text: "",
  });
  expect(addArticleResponse.status).toBe(400);
  expect(addArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when image is missing", async () => {
  const addArticleResponse = await addArticle({
    ...dto.addArticle,
    image: undefined,
  });
  expect(addArticleResponse.status).toBe(400);
  expect(addArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when image is not a jpeg file", async () => {
  const addArticleResponse = await addArticle({
    ...dto.addArticle,
    image: {
      contentUrl: "test/assets/articles/image.json",
      name: "image.json",
    },
  });
  expect(addArticleResponse.status).toBe(400);
  expect(addArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when an unexpected error occurred", async () => {
  jest.spyOn(services.mongoArticles, "addArticle").mockImplementationOnce(() => {
    throw new Error();
  });
  const addArticleResponse = await addArticle(dto.addArticle);
  expect(addArticleResponse.status).toBe(500);
  expect(addArticleResponse.body).toMatchSnapshot();
});

test("should add an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.header.location);
  expect(addArticleResponse.status).toBe(201);
  expect(addArticleResponse.body).toMatchSnapshot();
  expect(evaluateStorageClientFPutObjectSpy()).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not get an article when id is invalid", async () => {
  const _id = "invalid";
  const getArticleResponse = await getArticle(_id);
  expect(getArticleResponse.status).toBe(404);
  expect(getArticleResponse.body).toMatchSnapshot();
});

test("should not get an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const getArticleResponse = await getArticle(_id);
  expect(getArticleResponse.status).toBe(404);
  expect(getArticleResponse.body).toMatchSnapshot();
});

test("should get an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.header.location);
  const getArticleResponse = await getArticle(_id);
  expect(getArticleResponse.status).toBe(200);
  expect(evaluateResponse(getArticleResponse.body)).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not edit an article when id is invalid", async () => {
  const _id = "invalid";
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(404);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not edit an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(404);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not edit an article when data are missing", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.header.location);
  const editArticleResponse = await editArticle(_id, undefined);
  expect(editArticleResponse.status).toBe(400);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should not edit an article when validation failed", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.header.location);
  const editArticleResponse = await editArticle(_id, {
    description: "",
    name: "",
    text: "",
  });
  expect(editArticleResponse.status).toBe(400);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should not edit an article when an unexpected error occurred", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.header.location);
  jest.spyOn(services.mongoArticles, "editArticle").mockImplementationOnce(() => {
    throw new Error();
  });
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(500);
  expect(editArticleResponse.body).toMatchSnapshot();
  await removeArticle(_id);
});

test("should edit an article when image is missing", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.header.location);
  const editArticleResponse = await editArticle(_id, {
    ...dto.editArticle,
    image: undefined,
  });
  expect(editArticleResponse.status).toBe(204);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should edit an article when image is not a jpeg file", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.header.location);
  const editArticleResponse = await editArticle(_id, {
    ...dto.editArticle,
    image: {
      contentUrl: "test/assets/articles/new-image.json",
      name: "new-image.json",
    },
  });
  expect(editArticleResponse.status).toBe(204);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should edit an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.header.location);
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(204);
  expect(editArticleResponse.body).toMatchSnapshot();
  expect(evaluateStorageClientFPutObjectSpy()).toMatchSnapshot();
  expect(evaluateStorageClientRemoveObjectSpy()).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not remove an article when id is invalid", async () => {
  const _id = "invalid";
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(404);
  expect(removeArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not remove an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(404);
  expect(removeArticleResponse.body).toMatchSnapshot();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not remove an article when an unexpected error occurred", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.header.location);
  jest.spyOn(services.mongoArticles, "removeArticle").mockImplementationOnce(() => {
    throw new Error();
  });
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(500);
  expect(removeArticleResponse.body).toMatchSnapshot();
  await removeArticle(_id);
});

test("should remove an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.header.location);
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(204);
  expect(removeArticleResponse.body).toMatchSnapshot();
  expect(evaluateStorageClientRemoveObjectSpy()).toMatchSnapshot();
});
