# GenAI project template - Typescript

Project template to make starting project easier. Project uses OpenAI API to create assistants. To demonstrate the usage of the API, project contains the agent answering the questions concerning pokemons. Project is aimed to be used as a starting point for chatbots development.

Project is built with `nestJS` and `typescript`.

---

## Pre-requisities

- Node.js v20.0.6 or higher
- npm

---

## Installation

Run the following command to install the dependencies:

```bash
$ npm install
```

## Running the app

In order to run the app, you need to run the following command:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build
$ npm run build
```

## Test

Tests are written with `jest` and `supertest`. To run the tests, you need to run the following command:

```bash
# unit tests
$ npm run test

# watch
$ npm run test:watch

# test coverage
$ npm run test:cov

# e2e tests
$ npm run test:e2e

# debug
$ npm run test:debug
```

### Formatting

Following command will run the prettier:


```bash
# format - prettier
$ npm run format
```

## Secrets

Project takes advantage of the `envfile` dependency to manage secrets. Assuming so, you need to copy `.env.dist` to `.env` file in the root directory of the project and fill it with the relevant secrets.

```bash
$ cp .env.dist .env
```

---

## Architecture

Project is oriented on the OpenAI assistants API. Therefore, it is built with the following architecture:

 - `src/assistant` - contains the logic responsible for creation of the assistant and its usage. Every time you run the program it will check whether an assistant exists. If not, it will create one. If yes, it will use the existing one. It has also the basis for the chatbot development. It also contains the runtime handling.
- `src/chat` - contains the logic responsible for the implementation of the chatbot. It is oriented specifically on the project's use case. It contains agents oriented for the project's need. It uses the `assistant` module to handle user requests and to implement agents defined in this directory.