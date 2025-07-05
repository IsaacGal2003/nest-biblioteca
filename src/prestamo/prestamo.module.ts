import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Libro } from 'src/libro/entities/libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, Usuario, Libro])],
  controllers: [PrestamoController],
  providers: [PrestamoService],
})
export class PrestamoModule {}
