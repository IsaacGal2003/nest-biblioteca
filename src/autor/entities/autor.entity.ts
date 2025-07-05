import { Libro } from 'src/libro/entities/libro.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  nacionalidad: string;

  @ManyToOne(() => Libro, (libro) => libro.autor)
  libros: Libro[];
}
