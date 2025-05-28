import chokidar from "chokidar";
import { storage } from "./src/components/storage";

function generateObjectName(filePath: string) {
  const [baseFolder, ...objectName] = filePath.split("/");
  return objectName.join("/");
}

chokidar
  .watch("./public", {
    ignored: (filePath) => {
      return filePath.endsWith(".gitignore") || filePath.endsWith(".scss");
    },
    ignoreInitial: false,
  })
  .on("add", async (filePath) => {
    return storage.put(generateObjectName(filePath), filePath);
  })
  .on("change", async (filePath) => {
    return storage.put(generateObjectName(filePath), filePath);
  })
  .on("unlink", async (filePath) => {
    return storage.remove(generateObjectName(filePath));
  });
