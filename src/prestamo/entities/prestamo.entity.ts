import { Libro } from 'src/libro/entities/libro.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.prestamos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Libro, (libro) => libro.prestamos)
  @JoinColumn({ name: 'libroId' })
  libro: Libro;
}
