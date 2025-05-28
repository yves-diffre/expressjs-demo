import { storage } from "../storage";

function generateObjectName(filePath: string, file: Express.File) {
  const extension = {
    "image/jpeg": "jpg",
  }[file.mimetype];
  return `${filePath}.${extension}`;
}

async function put(objectName: string, file: Express.File) {
  return storage.put(objectName, file.file, {
    "Content-Type": file.mimetype,
  });
}

async function remove(objectName: string) {
  return storage.remove(objectName);
}

export const uploader = {
  generateObjectName,
  put,
  remove,
};
