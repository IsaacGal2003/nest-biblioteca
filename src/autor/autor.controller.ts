import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Autor } from './entities/autor.entity';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autorService.create(createAutorDto);
  }

  @Get()
  findAll(): Promise<Autor[]> {
    return this.autorService.findAll();
  }

  @Get(':id')
  findOne(id: number): Promise<Autor> {
    return this.autorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAutorDto,
  ): Promise<Autor> {
    return this.autorService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.autorService.remove(id);
  }
}
