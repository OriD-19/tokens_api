import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async createTask(title: string, completed:boolean, userId: number) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        const newTask = this.tasksRepository.create({
            title,
            completed,
            user: user
        });
        
        return this.tasksRepository.save(newTask);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find({ relations: ['user'] });
    }

    async findById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
        return task;
    }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        const task = await this.findById(id);
        Object.assign(task, data);
        return this.tasksRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
    }
}
