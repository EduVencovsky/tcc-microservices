import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './configuration';

@Injectable()
export class AppConfigService {
  constructor(public instance: ConfigService<EnvironmentVariables>) {
    console.log(instance.get('DB_PASSWORD'));
  }

  get version(): string {
    return process.env.npm_package_version || '1.0.0';
  }

  get isStaging(): boolean {
    return this.instance.get('NODE_ENV') === 'staging';
  }

  get isProd(): boolean {
    return this.instance.get('NODE_ENV') === 'production';
  }

  get isDev(): boolean {
    return this.instance.get('NODE_ENV') === 'development';
  }

  get isTest(): boolean {
    return this.instance.get('NODE_ENV') === 'test';
  }

  get port(): number {
    return parseInt(process.env.PORT) || this.instance.get('PORT') || 80;
  }
}
