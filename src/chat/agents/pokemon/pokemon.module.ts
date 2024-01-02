import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokemonService } from './pokemon.service';
import { GetPokemonAgent } from './get-pokemon.agent';
import { AgentModule } from '../../../assistant/agent/agent.module';

@Module({
  imports: [ConfigModule, HttpModule, AgentModule],
  providers: [PokemonService, GetPokemonAgent],
})
export class PokemonModule {}
