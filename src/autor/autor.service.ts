import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutorService {
  // Inyección de repositorio autor
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  // Crear un nuevo autor
  create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const autorData = this.autorRepository.create(createAutorDto);
    return this.autorRepository.save(autorData);
  }

  // Buscar todos los autores
  async findAll(): Promise<Autor[]> {
    const autorsData = await this.autorRepository.find();
    if (!autorsData || autorsData.length === 0) {
      throw new HttpException('No authors found', HttpStatus.NOT_FOUND);
    }
    return autorsData;
  }

  // Buscar un autor por ID
  async findOne(id: number): Promise<Autor> {
    const autorData = await this.autorRepository.findOneBy({ id });
    if (!autorData) {
      throw new HttpException('Autor not found', HttpStatus.NOT_FOUND);
    }
    return autorData;
  }

  // Actualizar un autor existente
  async update(id: number, autor: UpdateAutorDto): Promise<Autor> {
    const existingAutor = await this.autorRepository.findOneBy({ id });
    if (!existingAutor) {
      throw new HttpException('Autor not found', HttpStatus.NOT_FOUND);
    }
    // Actualizar los campos del autor con los datos proporcionados
    const updatedAutor = Object.assign(existingAutor, autor);
    return this.autorRepository.save(updatedAutor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.autorRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Autor not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Autor deleted successfully', HttpStatus.OK);
  }
}
