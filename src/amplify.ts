import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import type { Schema } from "./../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "./amplify_outputs.json";

Amplify.configure(outputs);
export const client = generateClient<Schema>();
