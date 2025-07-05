import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Libro } from '../libro/entities/libro.entity';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ) {}

  async create(dto: CreatePrestamoDto): Promise<Prestamo> {
    const usuario = await this.usuarioRepository.findOneBy({
      id: dto.usuarioId,
    });
    if (!usuario) {
      throw new HttpException('Usuario not found', HttpStatus.NOT_FOUND);
    }

    const libro = await this.libroRepository.findOneBy({ id: dto.libroId });
    if (!libro) {
      throw new HttpException('Libro not found', HttpStatus.NOT_FOUND);
    }

    const prestamo = this.prestamoRepository.create({
      fechaInicio: dto.fechaInicio,
      fechaFin: dto.fechaFin,
      usuario,
      libro,
    });

    return this.prestamoRepository.save(prestamo);
  }

  async findAll(): Promise<Prestamo[]> {
    const prestamos = await this.prestamoRepository.find({
      relations: ['usuario', 'libro'],
    });
    if (!prestamos.length) {
      throw new HttpException('No loans found', HttpStatus.NOT_FOUND);
    }
    return prestamos;
  }

  async findOne(id: number): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOne({
      where: { id },
      relations: ['usuario', 'libro'],
    });
    if (!prestamo) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }
    return prestamo;
  }

  async update(id: number, dto: UpdatePrestamoDto): Promise<Prestamo> {
    const prestamo = await this.prestamoRepository.findOneBy({ id });
    if (!prestamo) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }

    if (dto.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({
        id: dto.usuarioId,
      });
      if (!usuario) {
        throw new HttpException('Usuario not found', HttpStatus.NOT_FOUND);
      }
      prestamo.usuario = usuario;
    }

    if (dto.libroId) {
      const libro = await this.libroRepository.findOneBy({ id: dto.libroId });
      if (!libro) {
        throw new HttpException('Libro not found', HttpStatus.NOT_FOUND);
      }
      prestamo.libro = libro;
    }

    Object.assign(prestamo, dto);
    return this.prestamoRepository.save(prestamo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.prestamoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Prestamo deleted successfully', HttpStatus.OK);
  }
}
