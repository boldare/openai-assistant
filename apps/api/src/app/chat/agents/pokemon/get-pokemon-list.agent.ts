import { Injectable } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentBase, AgentService } from '@boldare/openai-assistant';
import { PokemonService } from './pokemon.service';

@Injectable()
export class GetPokemonListAgent extends AgentBase {
  override definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: 'Get list of Pokemon.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  };

  constructor(
    override readonly agentService: AgentService,
    private readonly pokemonService: PokemonService,
  ) {
    super(agentService);
  }

  override async output(): Promise<string> {
    try {
      // Get the list of Pokemon
      const pokemon = await this.pokemonService.getPokemonList();

      // Return the result
      return `The list of Pokemon: ${JSON.stringify(pokemon)}`;
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
