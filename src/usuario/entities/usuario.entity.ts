import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
