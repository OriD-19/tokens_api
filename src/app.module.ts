import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { SettingsModule } from './users/SettingModule/settings.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Jrlazo23',
            database: 'apicurso',
            entities: [User],
            synchronize: true,
        }),
        AuthModule,
        UsersModule,
        SettingsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
