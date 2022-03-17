# starter-express-typescript

Boilerplate of an [ExpressJS server](https://expressjs.com/) server with [TypeScript](https://www.typescriptlang.org/) using the concept of dependencies injection (inversion of control) thanks to [InversifyJS](https://github.com/inversify/InversifyJS). It uses the rust compiler [swc](https://swc.rs/) to compile the TypeScript code.

## Clone repository and install dependencies

```sh
git clone https://github.com/maxgfr/starter-express-typescript # For cloning the repository
cd starter-express-typescript  # To navigate to the repository root
yarn # Install dependencies
```

## Running the code

```sh
yarn build # For building the code with typechecking
yarn build:swc # For building without typechecking
yarn start # For running the code builded
```

Or in `development` mode:

```sh
yarn dev # For running the code in development thanks to swc and nodemon
```

> **:warning: No typechecking made in dev mode**

## Testing the code

```sh
yarn test # For running unit test
yarn test:watch # For watching unit test
```
