import { Injectable } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';
import { PokemonService } from './pokemon.service';

@Injectable()
export class GetPokemonStatsAgent extends AgentBase {
  override definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: 'Get the stats of a Pokemon',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description:
              'Name of the Pokemon e.g. Pikachu, Bulbasaur, Charmander, etc.',
          },
        },
        required: ['name'],
      },
    },
  };

  constructor(
    override readonly agentService: AgentService,
    private readonly pokemonService: PokemonService,
  ) {
    super(agentService);
  }

  override async output(data: AgentData): Promise<string> {
    try {
      // Parse the parameters from the input data
      const params = JSON.parse(data.params);
      const name = params?.name;

      // Check if the name is provided
      if (!name) {
        return 'No name provided';
      }

      // Get the stats for the Pokemon
      const pokemon = await this.pokemonService.getPokemon(name);

      // Return the result
      return `The stats of ${name} are: ${JSON.stringify(pokemon)}`;
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
