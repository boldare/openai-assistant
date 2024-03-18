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
          this.logger.error(error.response.data);
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );

    return data;
  }

  async getPokemon(name: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/${name?.toLowerCase()}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(error.response.data, error.response.status);
        }),
      ),
    );

    return data;
  }
}
