import { IsNotEmpty } from 'class-validator';

export class GetPokemonParamsDto {
  @IsNotEmpty()
  name: string;
}
