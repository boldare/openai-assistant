<p align="center">
  <a href="https://boldare.com/" target="blank">
    <img src="https://assistant.ai.boldare.dev/assets/ai-assistant.jpg" width="280" alt="Boldare" />
  </a>
</p>

<p align="center">
 <a href="https://assistant.ai.boldare.dev/chat" target="_blank">demo</a> 🔹
 <a href="https://assistant.ai.boldare.dev/api/docs" target="_blank">api docs</a> 🔹
 <a href="https://www.npmjs.com/package/@boldare/openai-assistant" target="_blank">npm</a> 🔹
 <a href="https://github.com/boldare/openai-assistant" target="_blank">github</a>
</p>

# 🤖 AI Assistant

Introducing the NestJS library, designed to harness the power of OpenAI's Assistant, enabling developers to create highly efficient, scalable, and rapid AI assistants and chatbots. This library is tailored for seamless integration into the NestJS ecosystem, offering an intuitive API, WebSockets, and tools that streamline the development of AI-driven interactions. Whether you're building a customer service bot, a virtual assistant, or an interactive chatbot for engaging user experiences, our library empowers you to leverage cutting-edge AI capabilities with minimal effort.

## 🚀 Features

#### AI Assistant library features

- **Function calling**: The library provides a way to create functions, which allows you to extend the assistant's capabilities with custom logic.
- **TTS (Text-to-Speech)**: The library provides a way to convert text to speech, which allows you to create voice-based interactions with the assistant.
- **STT (Speech-to-Text)**: The library provides a way to convert speech to text, which allows you to create voice-based interactions with the assistant.
- **File support**: The library provides a way to add files to the assistant, which allows you to extend the assistant's knowledge base with custom data.
- **WebSockets**: The library provides a WebSocket server for real-time communication between the client and the assistant.
- **REST API**: The library provides a REST API for communication with the assistant.

#### Additional features in the repository

- **Embedded chatbot**: The library provides a way to embed the chatbot on various websites through JavaScript scripts.
- **Chatbot client application**: The repository includes an example client application (SPA) with a chatbot.

## 🏆 Getting started

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
npm i @boldare/openai-assistant --save
```

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

# Assistant ID - leave it empty if you don't have an assistant yet
ASSISTANT_ID=
```

Please note that the `.env` file should not be committed to the repository. Add it to the `.gitignore` file to prevent it from being committed.

### Step 3: Configuration

The library provides a way to configure the assistant with the `AssistantModule.forRoot` method. The method takes a configuration object as an argument. Create a new configuration file like in a [sample configuration file (chat.config.ts)](apps%2Fapi%2Fsrc%2Fapp%2Fchat%2Fchat.config.ts) and fill it with the necessary configuration. 

More details about the configuration with code examples can be found in the [wiki](https://github.com/boldare/openai-assistant/wiki/%F0%9F%A4%96-AI-Assistant#step-3-configuration).


### Step 4: Function calling

Create a new service that extends the `AgentBase` class, fill the definition and implement the `output` method.

- The `output` method is the main method that will be called when the function is invoked.
- The `definition` property is an object that describes the function and its parameters.

For more information about function calling, you can refer to the [OpenAI documentation](https://platform.openai.com/docs/assistants/tools/defining-functions).

The instructions for creating a function can be found in the [wiki](https://github.com/boldare/openai-assistant/wiki/%F0%9F%A4%96-AI-Assistant#step-4-function-calling), while examples can be found in the [agents](apps/api/src/app/chat/agents) directory.

---

# 👨‍💻 Repository

The complete documentation on how to run the demo with all applications and libraries from the repository can be found in the [wiki](https://github.com/boldare/openai-assistant/wiki/%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-Repository).

---

# License

`@boldare/openai-assistant` is MIT licensed
