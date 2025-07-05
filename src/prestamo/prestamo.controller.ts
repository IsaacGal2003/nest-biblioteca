import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';

@Controller('prestamos')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post()
  create(@Body() dto: CreatePrestamoDto): Promise<Prestamo> {
    return this.prestamoService.create(dto);
  }

  @Get()
  findAll(): Promise<Prestamo[]> {
    return this.prestamoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Prestamo> {
    return this.prestamoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePrestamoDto,
  ): Promise<Prestamo> {
    return this.prestamoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.prestamoService.remove(id);
  }
}
