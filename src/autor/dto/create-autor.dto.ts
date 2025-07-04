import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  nacionalidad: string;
}
