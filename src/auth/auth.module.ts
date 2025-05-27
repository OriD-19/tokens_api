import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secretKey', // Use a strong secret key in production
            signOptions: { expiresIn: '1h' }, // Token expiration time
        }),
        UsersModule,
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersService],
    exports: [JwtModule],
})
export class AuthModule { }
