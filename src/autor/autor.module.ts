import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { Autor } from './entities/autor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
