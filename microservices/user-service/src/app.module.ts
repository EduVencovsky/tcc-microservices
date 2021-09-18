import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DatabaseModule, AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
