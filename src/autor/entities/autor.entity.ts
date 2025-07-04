import { Libro } from 'src/libro/entities/libro.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Libro, (libro) => libro.autor)
  libros: Libro[];
}
