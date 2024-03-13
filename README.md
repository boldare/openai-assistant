<p align="center">
  <a href="https://boldare.com/" target="blank">
    <img src="https://assistant.ai.boldare.dev/assets/boldare-circle.png" width="160" alt="Boldare" />
  </a>
</p>

<p align="center">
   <a href="https://www.npmjs.com/package/@boldare/assistant-ai" target="_blank">
    NPM
  </a>
</p>

# 🤖 AI Assistant

Introducing the NestJS library, designed to harness the power of OpenAI's Assistant, enabling developers to create highly efficient, scalable, and rapid AI assistants and chatbots. This library is tailored for seamless integration into the NestJS ecosystem, offering an intuitive API, WebSockets, and tools that streamline the development of AI-driven interactions. Whether you're building a customer service bot, a virtual assistant, or an interactive chatbot for engaging user experiences, our library empowers you to leverage cutting-edge AI capabilities with minimal effort.

## 🚀 Features

#### AI Assistant library features
- **WebSockets**: The library provides a WebSocket server for real-time communication between the client and the assistant.
- **REST API**: The library provides a REST API for communication with the assistant.
- **Function calling**: The library provides a way to create functions, which allows you to extend the assistant's capabilities with custom logic.
- **File support**: The library provides a way to add files to the assistant, which allows you to extend the assistant's knowledge base with custom data.
- **TTS (Text-to-Speech)**: The library provides a way to convert text to speech, which allows you to create voice-based interactions with the assistant.
- **STT (Speech-to-Text)**: The library provides a way to convert speech to text, which allows you to create voice-based interactions with the assistant.

#### Additional features in the repository
- **Embedded chatbot**: The library provides a way to embed the chatbot on various websites through JavaScript scripts.
- **Chatbot client application**: The repository includes an example client application (SPA) with a chatbot.

## Getting started

In this section, you will learn how to integrate the AI Assistant library into your NestJS application. The following steps will guide you through the process of setting up the library and creating simple functionalities.

### Step 0: Prerequiring

Before you start, you will need to have an account on the OpenAI platform and an API key. You can create an account [here](https://platform.openai.com/).

Open or create your NestJS application where you would like to integrate the AI Assistant. If you don't have a NestJS application yet, you can create one using the following command:

```bash
nest new project-name
```

### Step 1: Installation

Install the library using npm:

```bash
npm i @boldare/ai-assistant --save
```

### Step 2: Env variables

Set up your environment variables, create environment variables in the `.env` file in the root directory of the project, and populate it with the necessary secrets. You will need to add the OpenAI API Key and the Assistant ID. The Assistant ID is optional, and you can leave it empty if you don't have an assistant yet.

Create a `.env` file in the root directory of your project and populate it with the necessary secrets:

```bash
touch .env
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

Automatically, the library will add WebSockets ([chat.gateway.ts](libs/ai-assistant/src/lib/chat/chat.gateway.ts)) and a [REST API](https://assistant.ai.boldare.dev/api/docs) for the assistant. The WebSocket server will be available at the `/` endpoint, and the [REST API](https://assistant.ai.boldare.dev/api/docs) will be available at the `/api` endpoint (depending on the API prefix).

#### Websockets events

Currently, the library provides the following WebSocket events:

| Event name         | Description                                              |
|--------------------|----------------------------------------------------------|
| `send_message`     | The event is emitted when the user sends a message.      |
| `message_received` | The event is emitted when the assistant sends a message. |


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

More examples can be found in the [agents](apps/api/src/app/chat/agents) directory.

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
npm install
```

### Step 2: Env variables

Set up your environment variables, copy the `.env.dist` file to `.env` file in the root directory of the project, and populate it with the necessary secrets.

```bash
cp .env.dist .env
```

### Step 3: Run applications

```bash
# Start the app (api and spa)
npm run start:dev

# Start the api
npm run start:api

# Start the spa
npm run start:spa
```

Now you can open your browser and navigate to:

| URL                            | Description                             |
|--------------------------------|-----------------------------------------|
| http://localhost:4200/         | Client application (Angular)            |
| http://localhost:3000/         | API application, WebSockets (socket.io) |
| http://localhost:3000/api/     | API endpoints                           |
| http://localhost:3000/api/docs | API documentation (swagger)             |

### 🎉 Happy coding 🎉

# License
`@boldare/ai-assistant` is MIT licensed
