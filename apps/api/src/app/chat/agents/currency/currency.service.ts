import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(private httpService: HttpService) {}

  async getExchangeRate(currency: string) {
    const params = { from: currency };
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://api.frankfurter.app/latest', { params })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error?.response?.data || {
              message: 'Unknown error',
            };
            this.logger.error(message);
            throw new HttpException(message, error?.response?.status || 500);
          }),
        ),
    );

    return data;
  }
}
