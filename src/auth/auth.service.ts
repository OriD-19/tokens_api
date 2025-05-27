import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private userService: UsersService) { }

    async validateUser(email: string, password: string): Promise<any> {

        const user = await this.userService.findOneByEmail(email);
        console.log("User found: ", user);
        // check the password (encrypted with bcrypt)

        if (!user) {
            return null;
        }

        const validationResult = await bcrypt.compare(password, user.password);
        if (!validationResult) {
            return null;
        }

        // Remove password from the user object before returning
        console.log("User found and password matched");
        const { password: pwd, ...result } = user;
        return result;
    }

    async login(user: any) {
        console.log("user: ", user);
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}

