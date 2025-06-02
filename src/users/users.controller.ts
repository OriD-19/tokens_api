/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt";
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as { userId: number; email: string };
        const paramId = parseInt(id, 10);
        if (user.userId !== paramId) {
            throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
        }
        return this.usersService.remove(paramId);
    }
}
