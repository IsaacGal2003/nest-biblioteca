import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  // Inyección de repositorio autor
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear un nuevo autor
  create(createAutorDto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioData = this.usuarioRepository.create(createAutorDto);
    return this.usuarioRepository.save(usuarioData);
  }

  // Buscar todos los autores
  async findAll(): Promise<Usuario[]> {
    const usuariosData = await this.usuarioRepository.find();
    if (!usuariosData || usuariosData.length === 0) {
      throw new HttpException('No usuario found', HttpStatus.NOT_FOUND);
    }
    return usuariosData;
  }

  // Buscar un autor por ID
  async findOne(id: number): Promise<Usuario> {
    const usuarioData = await this.usuarioRepository.findOneBy({ id });
    if (!usuarioData) {
      throw new HttpException('usuario not found', HttpStatus.NOT_FOUND);
    }
    return usuarioData;
  }

  // Actualizar un autor existente
  async update(id: number, usuario: UpdateUsuarioDto): Promise<Usuario> {
    const existingUsuario = await this.usuarioRepository.findOneBy({ id });
    if (!existingUsuario) {
      throw new HttpException('Usuario not found', HttpStatus.NOT_FOUND);
    }
    // Actualizar los campos del autor con los datos proporcionados
    const updatedUsuario = Object.assign(existingUsuario, usuario);
    return this.usuarioRepository.save(updatedUsuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Usuario not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Usuario deleted successfully', HttpStatus.OK);
  }
}
