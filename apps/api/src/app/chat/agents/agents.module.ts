import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [WeatherModule, PokemonModule, CurrencyModule],
})
export class AgentsModule {}
