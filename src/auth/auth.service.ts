import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }


    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        console.log('Datos recibidos:', { email, password });
        console.log('Usuario encontrado:', user);

        // ⚠️ Comparación sin bcrypt (solo para pruebas locales)
        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };

        const { password, ...userWithoutPassword } = user;

        return {
            access_token: this.jwtService.sign(payload),
            user: userWithoutPassword,
        };
    }

}
