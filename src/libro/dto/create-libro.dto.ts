import { IsNotEmpty, IsString, Max, Min, IsInt } from 'class-validator';

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  anioPublicacion: number;

  @IsInt()
  autorId: number; // Assuming autorId is an integer representing the author's ID
}
