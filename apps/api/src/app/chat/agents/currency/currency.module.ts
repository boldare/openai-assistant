import { Module } from '@nestjs/common';
import { GetCurrencyAgent } from './get-currency.agent';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from './currency.service';
import { AgentModule } from '@boldare/openai-assistant';

@Module({
  imports: [AgentModule, HttpModule],
  providers: [CurrencyService, GetCurrencyAgent],
})
export class CurrencyModule {}
