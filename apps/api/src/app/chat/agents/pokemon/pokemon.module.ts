import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgentModule } from '@boldare/openai-assistant';
import { GetPokemonStatsAgent } from './get-pokemon-stats.agent';
import { PokemonService } from './pokemon.service';
import { GetPokemonListAgent } from './get-pokemon-list.agent';

@Module({
  imports: [AgentModule, HttpModule],
  providers: [PokemonService, GetPokemonStatsAgent, GetPokemonListAgent],
})
export class PokemonModule {}
