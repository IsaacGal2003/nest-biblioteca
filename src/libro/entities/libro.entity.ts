import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Autor } from '../../autor/entities/autor.entity';
import { Prestamo } from 'src/prestamo/entities/prestamo.entity';

export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  anioPublicacion: number;

  @ManyToOne(() => Autor, (autor) => autor.libros)
  @JoinColumn({ name: 'autorId' })
  autor: Autor;

  //
  @OneToMany(() => Prestamo, (prestamo) => prestamo.libro)
  prestamos: Prestamo[];
}
