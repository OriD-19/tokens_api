import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
    // tu lógica de generación de token aquí
    return {
      access_token: 'aqui_va_el_token', // reemplaza con tu lógica real
      user,
    };
  }
}
