import { Injectable } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentData } from '../../../assistant/agent/agent.model';
import { GetPokemonParamsDto } from './get-pokemon.model';
import { AgentService } from '../../../assistant/agent/agent.service';
import { PokemonService } from './pokemon.service';
import { AgentBase } from '../../../assistant/agent/agent.base';

@Injectable()
export class GetPokemonAgent extends AgentBase {
  definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: 'getPokemon',
      description: 'Get pokemon stats and types',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the pokemon provided by user',
          },
        },
        required: ['name'],
      },
    },
  };

  constructor(
    protected readonly agentService: AgentService,
    private readonly pokemonService: PokemonService,
  ) {
    super(agentService);
  }

  async output(data: AgentData): Promise<string> {
    try {
      const parsedData = JSON.parse(data?.params) as GetPokemonParamsDto;
      const pokemon = await this.pokemonService.getPokemon(parsedData?.name);

      return JSON.stringify(pokemon);
    } catch (errors) {
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
