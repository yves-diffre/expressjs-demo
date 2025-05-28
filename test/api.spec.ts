import { handleError } from "./api.helpers";

test("should handle error", async () => {
  const handleErrorResponse = await handleError();
  expect(handleErrorResponse.status).toBe(404);
  expect(handleErrorResponse.body).toMatchSnapshot();
});
