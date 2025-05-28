export type Article = {
  _id: string;
  dateCreated: string;
  dateModified?: string;
  description: string;
  image: string;
  name: string;
  text: string;
};

export const Article = {
  type: "object",
  additionalProperties: false,
  properties: {
    _id: {
      type: "string",
      format: "uuid",
    },
    dateCreated: {
      type: "string",
      format: "date",
    },
    dateModified: {
      type: "string",
      format: "date",
    },
    description: {
      type: "string",
      maxLength: 250,
      minLength: 1,
      transform: ["trim"],
    },
    image: {
      type: "string",
      maxLength: 100,
      minLength: 1,
      transform: ["trim"],
    },
    name: {
      type: "string",
      maxLength: 100,
      minLength: 1,
      transform: ["trim"],
    },
    text: {
      type: "string",
      minLength: 1,
      transform: ["trim"],
    },
  },
  required: ["_id", "dateCreated", "description", "image", "name", "text"],
};
