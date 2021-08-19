import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => {
        console.log(configService.instance.get('DB_PASSWORD'));
        return {
          type: 'mariadb',
          host: configService.instance.get('DB_HOST'),
          port: configService.instance.get<number>('DB_PORT'),
          username: configService.instance.get('DB_USERNAME'),
          password: configService.instance.get('DB_PASSWORD'),
          database: configService.instance.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: !configService.isProd,
          autoLoadEntities: true,
        };
      },
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseModule {}
