<p align="center">
  <a href="https://boldare.com/" target="blank">
    <img src="https://szukampracy.pl/uploads/download_5baaafea22d41.png" width="160" alt="Boldare" />
  </a>
</p>

# 🤖 AI Assistant

Introducing the NestJS library, designed to harness the power of OpenAI's Assistant, enabling developers to create highly efficient, scalable, and rapid AI assistants and chatbots. This library is tailored for seamless integration into the NestJS ecosystem, offering an intuitive API, WebSockets, and tools that streamline the development of AI-driven interactions. Whether you're building a customer service bot, a virtual assistant, or an interactive chatbot for engaging user experiences, our library empowers you to leverage cutting-edge AI capabilities with minimal effort.

### Step 0: Prerequiring

Before you start, you will need to have an account on the OpenAI platform and an API key. You can create an account [here](https://platform.openai.com/).

Open or create your NestJS application where you would like to integrate the AI Assistant. If you don't have a NestJS application yet, you can create one using the following command:

```bash
$ nest new project-name
```

### Step 1: Installation

Install the library using npm:

```bash
$ npm i @boldare/ai-assistant --save
```

### Step 2: Env variables

Set up your environment variables, create environment variables in the `.env` file in the root directory of the project, and populate it with the necessary secrets. You will need to add the OpenAI API Key and the Assistant ID. The Assistant ID is optional, and you can leave it empty if you don't have an assistant yet.

Create a `.env` file in the root directory of your project and populate it with the necessary secrets:

```bash
$ touch .env
```

Add the following content to the `.env` file:

```dotenv
# OpenAI API Key
OPENAI_API_KEY=

# Assistant ID - leave it empty if you don't have an assistant yet
ASSISTANT_ID=
```

### Step 3: Configuration

Configure the settings for your assistant. For more information about assistant parameters, you can refer to the [OpenAI documentation](https://platform.openai.com/docs/assistants/how-it-works/creating-assistants). A sample configuration can be found in ([chat.config.ts](apps%2Fapi%2Fsrc%2Fapp%2Fchat%2Fchat.config.ts)).

```js
// chat.config.ts file

// Default OpenAI configuration
export const assistantParams: AssistantCreateParams = {
  name: 'Your assistant name',
  instructions: `You are a chatbot assistant. Speak briefly and clearly.`,
  tools: [
    { type: 'code_interpreter' },
    { type: 'retrieval' },
    // (...) function calling - functions are configured by extended services
  ],
  model: 'gpt-4-1106-preview',
  metadata: {},
};

// Additional configuration for our assistant
export const assistantConfig: AssistantConfigParams = {
  id: process.env['ASSISTANT_ID'],          // OpenAI API Key
  params: assistantParams,                  // AssistantCreateParams
  filesDir: './apps/api/src/app/knowledge', // Path to the directory with files (the final path is "fileDir" + "single file")
  files: ['file1.txt', 'file2.json'],       // List of file names (or paths if you didn't fill in the above parameter)
};
```

Import the AI Assistant module with your configuration into the module file where you intend to use it:

```js
@Module({
  imports: [AssistantModule.forRoot(assistantConfig)],
})
export class ChatbotModule {}
```

### Step 4: Function calling

Create a new service that extends the `AgentBase` class, fill the definition and implement the `output` method. 
* The `output` method is the main method that will be called when the function is invoked. 
* The `definition` property is an object that describes the function and its parameters. 

For more information about function calling, you can refer to the [OpenAI documentation](https://platform.openai.com/docs/assistants/tools/defining-functions).
Below is an example of a service that extends the `AgentBase` class:
```js
@Injectable()
export class GetNicknameAgent extends AgentBase {
  definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: `Get the nickname of a city`,
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city and state e.g. San Francisco, CA',
          },
        },
        required: ['location'],
      },
    },
  };

  constructor(protected readonly agentService: AgentService) {
    super(agentService);
  }
  
  async output(data: AgentData): Promise<string> {
    // TODO: Your logic here
    return 'Your string value';
  }
}
```

Import the service into the module file where you intend to use it:

```js
import { Module } from '@nestjs/common';
import { AgentModule } from '@boldare/ai-assistant';
import { GetNicknameAgent } from './get-nickname.agent';

@Module({
  imports: [AgentModule],
  providers: [GetNicknameAgent],
})
export class AgentsModule {}
```

and remember to add the `AgentsModule` above the `AssistantModule` in your main module file (e.g. `chat.module.ts`):

```js
@Module({
  imports: [
    AgentsModule,
    AssistantModule.forRoot(assistantConfig),
  ],
})
export class ChatModule {}
```

---

# 👨‍💻 Repository

The repository includes a library with an AI assistant as well as other useful parts:

| Name                    | Type          | Description                                                                                                                     |
| ----------------------- | ------------- |---------------------------------------------------------------------------------------------------------------------------------|
| `@boldare/ai-assistant` | `library`     | A NestJS library based on the OpenAI Assistant for building efficient, scalable, and quick solutions for AI assistants/chatbots |
| `@boldare/ai-embedded`  | `library`     | The code enables embedding the chatbot on various websites through JavaScript scripts.                                          |
| `api`                   | `application` | Example usage of the `@boldare/ai-assistant` library.                                                                           |
| `spa`                   | `application` | Example client application (SPA) with a chatbot.                                                                                |

## Getting started

### Step 1: Install dependencies

```bash
$ npm install
```

### Step 2: Env variables

Set up your environment variables, copy the `.env.dist` file to `.env` file in the root directory of the project, and populate it with the necessary secrets.

```bash
$ cp .env.dist .env
```

### Step 3: Run applications

```bash
# Start the app (api and spa)
$ npm run start:dev

# Start the api
$ npm run start:api

# Start the spa
$ npm run start:spa
```

Now you can open your browser and navigate to:

| URL                            | Description                 |
| ------------------------------ | --------------------------- |
| http://localhost:4200/         | Client application (SPA)    |
| http://localhost:3000/api/     | API application             |
| http://localhost:3000/api/docs | API documentation (swagger) |

### 🎉 Happy coding 🎉
