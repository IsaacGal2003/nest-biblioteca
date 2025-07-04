import { IsDateString, IsInt } from 'class-validator';

export class CreatePrestamoDto {
  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsInt()
  usuarioId: number; // Assuming usuarioId is an integer representing the user's ID

  @IsInt()
  libroId: number; // Assuming libroId is an integer representing the book's ID
}
