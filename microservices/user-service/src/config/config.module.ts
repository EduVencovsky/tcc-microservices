import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';
import * as path from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, './.env'),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
