import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
  prestamos: Prestamo[];
}
