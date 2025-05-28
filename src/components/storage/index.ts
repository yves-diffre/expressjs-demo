import * as Minio from "minio";
import { env } from "../env";

const bucket = env.storage.bucket;
const client = new Minio.Client({
  endPoint: env.storage.host,
  port: env.storage.port,
  useSSL: env.storage.secure,
  accessKey: env.storage.user,
  secretKey: env.storage.password,
});

async function put(
  objectName: string,
  filePath: string,
  metaData?: Record<string, string | number>,
) {
  return client.fPutObject(bucket, objectName, filePath, metaData);
}

async function remove(objectName: string) {
  return client.removeObject(bucket, objectName);
}

export const storage = {
  client,
  put,
  remove,
};
