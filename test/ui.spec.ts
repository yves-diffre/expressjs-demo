import { evaluatePage, handleError } from "./ui.helpers";

test("should handle error", async () => {
  const handleErrorResponse = await handleError();
  expect(handleErrorResponse.status).toBe(404);
  expect(evaluatePage(handleErrorResponse.text)).toMatchSnapshot();
});
