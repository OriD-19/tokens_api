import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task, User]),
        UsersModule
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule { }
