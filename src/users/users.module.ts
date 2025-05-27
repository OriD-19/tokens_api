import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // Assuming User entity is imported from the correct path
    controllers: [UsersController],
    providers: [UsersService],
    exports: [TypeOrmModule]
})
export class UsersModule { }
