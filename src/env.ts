export interface ProcessEnvSchema extends NodeJS.ProcessEnv {
  REACT_APP_WHEATHER_API_KEY: string;
  REACT_APP_LOCATIONS: string;
}

const {
  REACT_APP_WHEATHER_API_KEY = String(),
  REACT_APP_LOCATIONS = String(),
} = process.env as ProcessEnvSchema;

export { REACT_APP_WHEATHER_API_KEY, REACT_APP_LOCATIONS };
