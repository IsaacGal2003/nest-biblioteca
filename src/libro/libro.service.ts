import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Autor } from '../autor/entities/autor.entity';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const { autorId, ...data } = createLibroDto;

    const autor = await this.autorRepository.findOneBy({ id: autorId });
    if (!autor) {
      throw new HttpException('Autor not found', HttpStatus.NOT_FOUND);
    }

    const libro = this.libroRepository.create({ ...data, autor });
    return this.libroRepository.save(libro);
  }

  async findAll(): Promise<Libro[]> {
    const libros = await this.libroRepository.find({ relations: ['autor'] });
    if (!libros.length) {
      throw new HttpException('No books found', HttpStatus.NOT_FOUND);
    }
    return libros;
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepository.findOne({
      where: { id },
      relations: ['autor'],
    });
    if (!libro) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return libro;
  }

  async update(id: number, dto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.libroRepository.findOneBy({ id });
    if (!libro) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    if (dto.autorId) {
      const autor = await this.autorRepository.findOneBy({ id: dto.autorId });
      if (!autor) {
        throw new HttpException('Autor not found', HttpStatus.NOT_FOUND);
      }
      libro.autor = autor;
    }

    Object.assign(libro, dto);
    return this.libroRepository.save(libro);
  }

  async remove(id: number): Promise<void> {
    const result = await this.libroRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Libro deleted successfully', HttpStatus.OK);
  }
}
