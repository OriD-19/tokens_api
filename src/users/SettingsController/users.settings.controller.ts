import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { Controller, Get, UseGuards, Req} from '@nestjs/common';
import { Request } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController
{
    @Get()
    getSettings(@Req() req: any)
    {
        const user = req.user as any;
        return {
            mensaje: `Bienvenido a tu configuracion, ${user.name}`,
            email: user.email,
        }
    }
}   