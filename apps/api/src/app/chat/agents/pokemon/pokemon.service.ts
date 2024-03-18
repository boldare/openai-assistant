import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpService: HttpService) {}

  async getPokemonList() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/?limit=30`).pipe(
        catchError((error: AxiosError) => {
          const message = error?.response?.data || { message: 'Unknown error' };
          this.logger.error(message);
          throw new HttpException(message, error?.response?.status || 500);
        }),
      ),
    );

    return data;
  }

  async getPokemon(name: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/${name?.toLowerCase()}`).pipe(
        catchError((error: AxiosError) => {
          const message = error?.response?.data || { message: 'Unknown error' };
          this.logger.error(message);
          throw new HttpException(message, error?.response?.status || 500);
        }),
      ),
    );

    return data;
  }
}
