import { Module } from '@nestjs/common';
import { SettingsController } from '../SettingsController/users.settings.controller';

@Module({
  controllers: [SettingsController],
})
export class SettingsModule {}
