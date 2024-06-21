<p align="center">
  <a href="https://www.boldare.com/services/ai-software-development-consulting/" target="blank">
    <img src="https://assistant.ai.boldare.dev/assets/ai-assistant.jpg" width="280" alt="Boldare" />
  </a>
</p>

<p align="center">
 <a href="https://assistant.ai.boldare.dev/" target="_blank">Demo</a> 🔹
 <a href="https://assistant.ai.boldare.dev/api/docs" target="_blank">API docs</a> 🔹
 <a href="https://www.npmjs.com/package/@boldare/openai-assistant" target="_blank">npm</a> 🔹
 <a href="https://github.com/boldare/openai-assistant" target="_blank">Github</a> 🔹
 <a href="https://www.boldare.com/services/ai-software-development-consulting/" target="_blank">How we can help you</a>
</p>


# 🤖 AI Assistant
`@boldare/openai-assistant` - library to kickstart your AI Assistant development under 15 minutes.

Introducing the NestJS library. Whether you're building a virtual assistant, or an interactive chatbot for engaging user experiences, our library empowers you to leverage cutting-edge AI capabilities with minimal effort.

**The library provides ready-to-use API endpoints** handling your assistant and WebSocket server for real-time communication between the client and the assistant. Install the library and paste the config to get it running.

## 📚 Watch the tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/rxPdFat90qY?si=WjSM_fvS2SoLWZLr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 🚀 Features

### AI Assistant library features

- **Function calling**: create functions, so assistant can execute your custom logic!
- **TTS (Text-to-Speech)**: convert text to speech, so you can hear your assistant!
- **STT (Speech-to-Text)**: convert speech to text, so you can make conversation easier!
- **File support**: add files to the assistant, so you can extend assistant's knowledge base with custom data!
- **WebSockets**: establish WebSocket server for real-time communication between the client and the assistant!
- **REST API**: Just use ready REST API for communication with the assistant!
- **Vision with GPT-4o** - use the GPT-4o and make your assistant understand images and generate text based on them!

#### Additional features in the repository

The repository contains a library but also provides additional features. You can just clone the repository and use it instantly to gain from all features:

- **Embedded chatbot**: embed the chatbot on various websites through JavaScript scripts!
- **Chatbot client application**: use ready client application (SPA) with a chatbot!

## 🏆 Getting started

In this section, you will learn how to integrate the AI Assistant library into your NestJS application. The following steps will guide you through the process of setting up the library and creating simple functionalities.

<!-- The information that after this steps we will have the endpoints ready -->

### Step 0: Prerequisites

- Node.js (`^20.0.0` version)
- npm (`^10.0.0` version)
- NestJS (`^10.0.0` version)
- OpenAI (`^4.51.0` version)
- OpenAI API key

Open or create your NestJS application where you would like to integrate the AI Assistant. To create a new NestJS application, use the following command:

```bash
nest new project-name
```

Now you have to install the packages. Go to the next step.

### Step 1: Installation

Make sure you are in the root directory of your project.
Install the library and `openai` package using npm:

```bash
npm i @boldare/openai-assistant openai --save
```

The library is installed but we have to configure it. Go to the next step.

### Step 2: Env variables

Set up your environment variables, create environment variables in the `.env` file in the root directory of the project, and populate it with the necessary secrets. The assistant ID is optional and serves as a unique identifier for your assistant. When the environment variable is not set, the assistant will be created automatically. You can use the assistant ID to connect to an existing assistant, which can be found in the OpenAI platform after creating an assistant.

Create a `.env` file in the root directory of your project and populate it with the necessary secrets:
 
```bash
touch .env
```

Add the following content to the `.env` file:

```dotenv
# OpenAI API Key
OPENAI_API_KEY=

# Assistant ID - leave it empty if you don't have an assistant to reuse
ASSISTANT_ID=
```

Please note that the `.env` file should not be committed to the repository. *Add the `.env` file to the `.gitignore`* file to prevent it from being committed.

This was the first step needed to run the library. The next step is to configure the assistant.

### Step 3: Configuration

The library provides a way to configure the assistant with the `AssistantModule.forRoot` method. The method takes a configuration object as an argument. Create a new configuration file like in a [sample configuration file (chat.config.ts)](apps%2Fapi%2Fsrc%2Fapp%2Fchat%2Fchat.config.ts) and fill it with the necessary configuration. 

```typescript
// chat.config.ts file
import { AssistantConfigParams } from '@boldare/openai-assistant';
import { AssistantCreateParams } from 'openai/resources/beta';

// Default OpenAI configuration
export const assistantParams: AssistantCreateParams = {
  name: 'Your assistant name',
  instructions: `You are a chatbot assistant. Speak briefly and clearly.`,
  tools: [{ type: 'file_search'}],
  model: 'gpt-4-turbo',
  temperature: 0.05,
};

// Additional configuration for our assistant
export const assistantConfig: AssistantConfigParams = {
  id: process.env['ASSISTANT_ID'],
  params: assistantParams,
  filesDir: './apps/api/src/app/knowledge',
  toolResources: {
    file_search: {
      // Provide files if you use file_search tool
      fileNames: ['example1.txt', 'example2.txt'],
    },
  },
};
```


More details about the configuration can be found in the [wiki](https://github.com/boldare/openai-assistant/wiki/%F0%9F%A4%96-AI-Assistant#step-3-configuration).

#### What is this step for?
From now you can run your application and call the assistant.


### Step 4: Function calling

Function calling allows you to extend the assistant's capabilities with custom logic. **If you are not going to use function calling you can jump to: [Step 5: Testing](#step-5-running-the-application-and-testing).**

Create a new service that extends the `AgentBase` class, fill the definition and implement the `output` method.

- The `output` method is the main method that will be called when the function is invoked by the assistant.
- The `definition` property is an object that describes the function and its parameters so the assistant can understand how to call it.

For more information about function calling, you can refer to the [OpenAI documentation](https://platform.openai.com/docs/assistants/tools/defining-functions).

The instructions for creating a function can be found in the [wiki](https://github.com/boldare/openai-assistant/wiki/%F0%9F%A4%96-AI-Assistant#step-4-function-calling), while examples can be found in the [agents](apps/api/src/app/chat/agents) directory.

#### What is this step for?

If you've defined a function and the output method, you can now call it from the assistant just by asking him to do the action described in the function definition.


### Step 5: Running the application and testing

Run your application and this will allow you to test the assistant. 
  
  ```bash
  # use this if you are using the repository:
  npm run start:dev

  # if you are using your own NestJS application, please check the npm scripts in the package.json file
  # defualt command for NestJS is:
  npm run start
  ```

  Then you can test the assistant.
  1. First, you need to create a thread. You can create one
  by sending a POST request to the `/assistant/threads` endpoint with the **empty object in the body**.
  2. Then you can send a message to the assistant by sending a POST request to the `/assistant/chat` endpoint with the following body:
  ```json
  {
    "threadId": "your-thread-id",
    "content": "Hello, how are you?"
  }
  ```
  3. The assistant will respond with a message. You can send more messages to the assistant by sending a POST request to the `/assistant/chat` endpoint with the same body as in step 2.

  Congrats! You have successfully integrated the AI Assistant library into your NestJS application. 🎉

---


## 🤔 Are you stuck?

Boldare's engineers are here to help you. If you have any questions or need help with the implementation, feel free to **[click here to book a call with one of our engineers.](https://calendly.com/olivier-halupczok/30min)**

**Learn more how [Boldare can help you with AI development on our website](https://www.boldare.com/services/ai-software-development-consulting/).**

You can also ask questions in the [GitHub Discussions](https://github.com/boldare/openai-assistant/discussions) section.

---

## 👨‍💻 Repository

The complete documentation on how to run the demo with all applications and libraries from the repository can be found in the [wiki](https://github.com/boldare/openai-assistant/wiki/%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-Repository).

---

## Contributions

Would you like to see new features in the library? 
- You can freely contribute to the project! Just create a pull request with your changes.
- [Talk your idea over with one of our engineers.](https://calendly.com/olivier-halupczok/30min)
- You can also [post your idea here](https://github.com/boldare/openai-assistant/discussions).

---

## License

`@boldare/openai-assistant` and this repository is MIT licensed
