/* eslint-disable prettier/prettier */
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

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }


    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }


    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        await this.usersRepository.update(id, updateUserDto);
        return this.findOne(id); 
    }

    async remove(id: number) {
        try {
            await this.usersRepository.delete(id);
            return { message: `User with id ${id} deleted successfully` };
        } catch (error) {
            return { message: `Error deleting user with id ${id}: ${error}` };
        }
    }
}
