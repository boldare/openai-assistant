import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  apiUrl = this.configService.get('POKEMON_API_URL');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPokemon(name: string): Promise<string> {
    return firstValueFrom(
      this.httpService
        .get(`${this.apiUrl}/pokemon/${name.toLowerCase()}`)
        .pipe(map(res => res.data)),
    );
  }
}
