import {
  addArticle,
  displayAddArticle,
  displayArticle,
  displayArticles,
  displayEditArticle,
  dto,
  editArticle,
  evaluatePage,
  evaluateStorageClientFPutObjectSpy,
  evaluateStorageClientRemoveObjectSpy,
  getInsertedId,
  removeArticle,
  services,
  spies,
} from "./uiMongoArticles.helpers";

afterEach(() => {
  spies.storage.client.fPutObject.mockClear();
  spies.storage.client.removeObject.mockClear();
});

test("should display articles", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  const displayArticlesResponse = await displayArticles();
  expect(displayArticlesResponse.status).toBe(200);
  expect(evaluatePage(displayArticlesResponse.text, _id)).toMatchSnapshot();
  await removeArticle(_id);
});

test("should display add an article", async () => {
  const displayAddArticleResponse = await displayAddArticle();
  expect(displayAddArticleResponse.status).toBe(200);
  expect(evaluatePage(displayAddArticleResponse.text)).toMatchSnapshot();
});

test("should not add an article when data are missing", async () => {
  const addArticleResponse = await addArticle(undefined);
  expect(addArticleResponse.status).toBe(200);
  expect(evaluatePage(addArticleResponse.text)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when validation failed", async () => {
  const addArticleResponse = await addArticle({
    description: "",
    name: "",
    text: "",
  });
  expect(addArticleResponse.status).toBe(200);
  expect(evaluatePage(addArticleResponse.text)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when image is missing", async () => {
  const addArticleResponse = await addArticle({
    ...dto.addArticle,
    image: undefined,
  });
  expect(addArticleResponse.status).toBe(200);
  expect(evaluatePage(addArticleResponse.text)).toMatchSnapshot();
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
  expect(addArticleResponse.status).toBe(200);
  expect(evaluatePage(addArticleResponse.text)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
});

test("should not add an article when an unexpected error occurred", async () => {
  jest.spyOn(services.mongoArticles, "addArticle").mockImplementationOnce(() => {
    throw new Error();
  });
  const addArticleResponse = await addArticle(dto.addArticle);
  expect(addArticleResponse.status).toBe(200);
  expect(evaluatePage(addArticleResponse.text)).toMatchSnapshot();
});

test("should add an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  expect(addArticleResponse.status).toBe(200);
  expect(evaluatePage(addArticleResponse.text, _id)).toMatchSnapshot();
  expect(evaluateStorageClientFPutObjectSpy()).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not display an article when id is invalid", async () => {
  const _id = "invalid";
  const displayArticleResponse = await displayArticle(_id);
  expect(displayArticleResponse.status).toBe(404);
  expect(displayArticleResponse.text).toMatchSnapshot();
});

test("should not display an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const displayArticleResponse = await displayArticle(_id);
  expect(displayArticleResponse.status).toBe(404);
  expect(displayArticleResponse.text).toMatchSnapshot();
});

test("should display an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  const displayArticleResponse = await displayArticle(_id);
  expect(displayArticleResponse.status).toBe(200);
  expect(evaluatePage(displayArticleResponse.text, _id)).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not display edit an article when id is invalid", async () => {
  const _id = "invalid";
  const displayEditArticleResponse = await displayEditArticle(_id);
  expect(displayEditArticleResponse.status).toBe(404);
  expect(displayEditArticleResponse.text).toMatchSnapshot();
});

test("should not display edit an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const displayEditArticleResponse = await displayEditArticle(_id);
  expect(displayEditArticleResponse.status).toBe(404);
  expect(displayEditArticleResponse.text).toMatchSnapshot();
});

test("should display edit an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  const displayEditArticleResponse = await displayEditArticle(_id);
  expect(displayEditArticleResponse.status).toBe(200);
  expect(evaluatePage(displayEditArticleResponse.text, _id)).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not edit an article when id is invalid", async () => {
  const _id = "invalid";
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not edit an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not edit an article when data are missing", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.request.url);
  const editArticleResponse = await editArticle(_id, undefined);
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should not edit an article when validation failed", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.request.url);
  const editArticleResponse = await editArticle(_id, {
    description: "",
    name: "",
    text: "",
  });
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should not edit an article when an unexpected error occurred", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  jest.spyOn(services.mongoArticles, "editArticle").mockImplementationOnce(() => {
    throw new Error();
  });
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  await removeArticle(_id);
});

test("should edit an article when image is missing", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.request.url);
  const editArticleResponse = await editArticle(_id, {
    ...dto.editArticle,
    image: undefined,
  });
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should edit an article when image is not a jpeg file", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.request.url);
  const editArticleResponse = await editArticle(_id, {
    ...dto.editArticle,
    image: {
      contentUrl: "test/assets/articles/new-image.json",
      name: "new-image.json",
    },
  });
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.fPutObject).not.toHaveBeenCalled();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
  await removeArticle(_id);
});

test("should edit an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  spies.storage.client.fPutObject.mockClear();
  const _id = getInsertedId(addArticleResponse.request.url);
  const editArticleResponse = await editArticle(_id, dto.editArticle);
  expect(editArticleResponse.status).toBe(200);
  expect(evaluatePage(editArticleResponse.text, _id)).toMatchSnapshot();
  expect(evaluateStorageClientFPutObjectSpy()).toMatchSnapshot();
  expect(evaluateStorageClientRemoveObjectSpy()).toMatchSnapshot();
  await removeArticle(_id);
});

test("should not remove an article when id is invalid", async () => {
  const _id = "invalid";
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(200);
  expect(evaluatePage(removeArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not remove an article when id is not found", async () => {
  const _id = "7de2964c-6316-4549-963e-72ef1a5f163b";
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(200);
  expect(evaluatePage(removeArticleResponse.text, _id)).toMatchSnapshot();
  expect(spies.storage.client.removeObject).not.toHaveBeenCalled();
});

test("should not remove an article when an unexpected error occurred", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  jest.spyOn(services.mongoArticles, "removeArticle").mockImplementationOnce(() => {
    throw new Error();
  });
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(200);
  expect(evaluatePage(removeArticleResponse.text, _id)).toMatchSnapshot();
  await removeArticle(_id);
});

test("should remove an article", async () => {
  const addArticleResponse = await addArticle(dto.addArticle);
  const _id = getInsertedId(addArticleResponse.request.url);
  const removeArticleResponse = await removeArticle(_id);
  expect(removeArticleResponse.status).toBe(200);
  expect(evaluatePage(removeArticleResponse.text, _id)).toMatchSnapshot();
  expect(evaluateStorageClientRemoveObjectSpy()).toMatchSnapshot();
});
