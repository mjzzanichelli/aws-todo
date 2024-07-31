# AWS Amplify TODO

This application uses [AWS Amplify Gen 2 and React](https://docs.amplify.aws/react/how-amplify-works/).

## Infrastructure

To run the solution, it is neccessary to have an application set-up in AWS. Follow the steps described [here](https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/) to know how.

Use the content in [./amplify.yml](./amplify.yml) to setup correct deployment steps.

This package comes with prebuilt scripts to:

- authenticate your user with the [IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)

```console
npm run sso
```

- Generate a new `./src/amplify_outputs.json`:

```console
npm run sandbox
```

- Watch for changes in [./amplify](./amplify/) directory and generate a new `./src/amplify_outputs.json`

```console
npm run sandbox:watch
```

## Env

```
REACT_APP_WHEATHER_API_KEY= //api key from weatherapi.com
REACT_APP_LOCATIONS= //list of locations separated by pipe, eg: London|Tel Aviv|Athens
```

## Getting Started

```console
// Install dependencies
> npm install

// Generate ./src/amplify_outputs.json
> npm run sandbox

// Compile and run
> npm start

// If the browser doesn't open, manually navigate to the url logged in the console
```

## Generate webfont icons from SVG images:

To modify the current icons set, update the `.svg` files contained in `./webfonts/icons` and the codes contained in `./webfonts/icons/codepoints.json`. The keys will be used in Typescript to write the type `IconName` to help developers knowing all the available options. The values have to be valid hexadecimal.

```
npm run webfonts
```

Start using the new webfonts by replacing the content of `./src/components/icons/customicons` with `./webfonts/fonts/custom/style` and `./webfonts/fonts/custom/codepoints.json`

## Useful Links

[Customize your auth rules](https://docs.amplify.aws/react/build-a-backend/data/customize-authz/)

[Per-user/per-owner data access](https://docs.amplify.aws/react/build-a-backend/data/customize-authz/per-user-per-owner-data-access/)
