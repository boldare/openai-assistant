import { Module } from '@nestjs/common';
import { GetCurrentWeatherAgent } from './get-current-weather.agent';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { AgentModule } from '@boldare/openai-assistant';

@Module({
  imports: [AgentModule, HttpModule],
  providers: [WeatherService, GetCurrentWeatherAgent],
})
export class WeatherModule {}
