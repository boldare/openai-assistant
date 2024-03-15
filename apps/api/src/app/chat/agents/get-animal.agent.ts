import { Injectable } from '@nestjs/common';
import { AssistantCreateParams } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';

@Injectable()
export class GetAnimalAgent extends AgentBase {
  definition: AssistantCreateParams.AssistantToolsFunction = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: `Display name od the animal`,
      parameters: {
        type: 'object',
        properties: {
          animal: {
            type: 'string',
            description: `Type of the animal`,
          },
        },
        required: ['animal'],
      },
    },
  };

  constructor(protected readonly agentService: AgentService) {
    super(agentService);
  }

  async output(data: AgentData): Promise<string> {
    try {
      const params = JSON.parse(data.params);
      const animal = params?.animal;
      const animals = [
        { id: 1, animal: 'dog', name: 'Rex' },
        { id: 2, animal: 'cat', name: 'Mittens' },
        { id: 3, animal: 'bird', name: 'Tweety' },
        { id: 4, animal: 'fish', name: 'Goldie' },
        { id: 5, animal: 'rabbit', name: 'Bugs' },
      ];

      if (!animal) {
        return 'No animal provided';
      }

      return animals.find(a => a.animal === animal)?.name || 'No such animal';
    } catch (errors) {
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
