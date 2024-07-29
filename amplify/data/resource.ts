import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const Tags = a.enum(["Urgent", "High", "Medium", "Low", "NotUrgent"]);
const schema = a.schema({
  Tags,
  Tasks: a
    .model({
      name: a.string().required(),
      dueDate: a.date(),
      tag: Tags,
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
