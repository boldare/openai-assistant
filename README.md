# AI Assistant

Install the dependencies:

```bash
$ npm install
```

Project takes advantage of the `envfile` dependency to manage secrets. Assuming so, you need to copy `.env.dist` to `.env` file in the root directory of the project and fill it with the relevant secrets.

```bash
$ cp .env.dist .env
```

---

```bash
# Start the app (api and spa)
$ npm run start:dev

# Start the api
$ npm run start:api

# Start the spa
$ npm run start:spa
```

Open your browser and navigate to:

- http://localhost:4200/ - spa
- http://localhost:3000/api/ - api
- http://localhost:3000/api/docs - api documentation

Happy coding!

## Ready to deploy?

Just merge your code to the `main` branch.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)

## First steps

```bash
$ nest new project-name
```

```bash
$ npm i @boldare/ai-assistant --save
```

Create environment variables in the `.env` file:

```bash
OPENAI_API_KEY=
ASSISTANT_ID=
```

Set up the configuration:

```js
import { AssistantCreateParams } from 'openai/resources/beta';
import { AssistantConfigParams } from '@boldare/ai-assistant';
import 'dotenv/config';

export const assistantParams: AssistantCreateParams = {
  name: '@boldare/ai-assistant',
  instructions: `You are a chatbot assistant. Use the general knowledge to answer questions. Speak briefly and clearly.`,
  tools: [{ type: 'code_interpreter' }, { type: 'retrieval' }],
  model: 'gpt-4-1106-preview',
  metadata: {},
};

export const assistantConfig: AssistantConfigParams = {
  id: process.env['ASSISTANT_ID'] || '',
  params: assistantParams,
  filesDir: './apps/api/src/app/knowledge',
  files: [],
};
```

Set up the configuration in the `app.module.ts` file:

```js
AssistantModule.forRoot(assistantConfig);
```
