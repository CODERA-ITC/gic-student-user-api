import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import path from 'path'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        ssl: configService.get<string>('DATABASE_SSL') === 'true'
          ? {
            rejectUnauthorized: false,
          }
          : false,
        entities: [path.join(__dirname, '../**/*.entity.{js,ts}')],
        // migrations: ['migrations/*.{ts,js}'],
        // migrationsRun: true,
        synchronize: true, // Disable synchronization to use migrations only
        dropSchema: true, // Drop and recreate schema for development
        autoLoadEntities: true,
        // Disable all logging to reduce console noise
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
