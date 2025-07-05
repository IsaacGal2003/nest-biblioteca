import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto): Promise<Libro> {
    return this.libroService.create(createLibroDto);
  }

  @Get()
  findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Libro> {
    return this.libroService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibroDto: UpdateLibroDto,
  ): Promise<Libro> {
    return this.libroService.update(id, updateLibroDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.libroService.remove(id);
  }
}
