import { Injectable } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';
import { WeatherService } from './weather.service';

@Injectable()
export class GetCurrentWeatherAgent extends AgentBase {
  override definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: 'Get the current weather in location',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description:
              'Name of the city e.g. Warsaw, San Francisco, Paris, etc.',
          },
        },
        required: ['city'],
      },
    },
  };

  constructor(
    override readonly agentService: AgentService,
    private readonly weatherService: WeatherService,
  ) {
    super(agentService);
  }

  override async output(data: AgentData): Promise<string> {
    try {
      // Parse the parameters from the input data
      const params = JSON.parse(data.params);
      const city = params?.city;

      // Check if the city is provided
      if (!city) {
        return 'No city provided';
      }

      // Get the current weather for the city
      const weather = await this.weatherService.getCurrentWeather(city);

      // Return the result
      return `The current weather in ${city} is: ${JSON.stringify(weather)}`;
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
