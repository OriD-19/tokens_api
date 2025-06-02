import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
        return this.usersService.create(createUserDto);
    }


    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Email o contraseña incorrectos');
        }
        return this.authService.login(user);
    }
}
