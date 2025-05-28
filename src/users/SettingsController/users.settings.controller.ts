import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common'
import { UsersService } from '../users.service';

@UseGuards(JwtAuthGuard)
export class SettingsController
{
    
}