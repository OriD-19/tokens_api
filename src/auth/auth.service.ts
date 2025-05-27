import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private userService: UsersService) { }

    private checkPassword(password: string, hashedPassword: string) {
        // This function should compare the plain password with the hashed checkPassword
        return bcrypt.compareSync(password, hashedPassword);
    }

    async validateUser(email: string, password: string) {

        const user = await this.userService.findOneByEmail(email);

        // check the password (encrypted with bcrypt)
        if (user && this.checkPassword(password, user.password)) {
            // Remove password from the user object before returning
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}

