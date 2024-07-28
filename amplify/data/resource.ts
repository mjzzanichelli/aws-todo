import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const tags = a.enum(["Urgent", "Low Priority"]);

const schema = a.schema({
  Tags: tags,
  Tasks: a
    .model({
      name: a.string().required(),
      dueDate: a.date(),
      tags: a.string().array(),
      attachment: a.string(),
      done: a.boolean(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
