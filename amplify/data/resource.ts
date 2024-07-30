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
      order: a.integer(),
    })
    .authorization((allow) => [allow.owner(), allow.guest().to(["read"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
