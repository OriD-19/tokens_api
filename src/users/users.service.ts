import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // ✅ Crear usuario
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    // ✅ Obtener todos los usuarios
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // ✅ Obtener usuario por ID
    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }


    // ✅ Obtener usuario por email (usado por AuthService)
    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }


    // ✅ Actualizar usuario
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        await this.usersRepository.update(id, updateUserDto);
        return this.findOne(id); // ahora devuelve User | null
    }

    // ✅ Eliminar usuario
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
