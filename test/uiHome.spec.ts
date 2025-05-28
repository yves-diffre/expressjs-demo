import { displayHome, evaluatePage } from "./uiHome.helpers";

test("should display home", async () => {
  const displayHomeResponse = await displayHome();
  expect(displayHomeResponse.status).toBe(200);
  expect(evaluatePage(displayHomeResponse.text)).toMatchSnapshot();
});
