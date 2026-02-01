import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { RealStudentModule } from './real-student/real-student.module';
import { CourseModule } from './course/course.module';
import { SecurityQuestionsModule } from './security_questions/security_questions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import awsConfig from './common/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [awsConfig],
      envFilePath: '.env',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    DatabaseModule,
    UserModule,
    CourseModule,
    DepartmentModule,
    RealStudentModule,
    SecurityQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
