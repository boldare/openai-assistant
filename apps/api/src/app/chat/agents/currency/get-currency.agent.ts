import { Injectable } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';
import { CurrencyService } from './currency.service';

@Injectable()
export class GetCurrencyAgent extends AgentBase {
  definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: 'Get the current currency exchange rate.',
      parameters: {
        type: 'object',
        properties: {
          currency: {
            type: 'string',
            description: 'Currency code e.g. USD, EUR, GBP, etc.',
          },
        },
        required: ['currency'],
      },
    },
  };

  constructor(
    protected readonly agentService: AgentService,
    private readonly currencyService: CurrencyService,
  ) {
    super(agentService);
  }

  async output(data: AgentData): Promise<string> {
    try {
      // Parse the parameters from the input data
      const params = JSON.parse(data.params);
      const currency = params?.currency;

      // Check if the currency is provided
      if (!currency) {
        return 'No currency provided';
      }

      // Get the current currency exchange rate
      const response = await this.currencyService.getExchangeRate(currency);

      // Return the result
      return `The current exchange rate for ${currency} is: ${JSON.stringify(
        response,
      )}`;
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
