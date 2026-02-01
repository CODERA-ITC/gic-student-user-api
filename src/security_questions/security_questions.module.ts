import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { SecurityQuestion } from './entities/security_question.entity'
import { SecurityQuestionsController } from './security_questions.controller'
import { SecurityQuestionsService } from './security_questions.service'

@Module({
  imports: [TypeOrmModule.forFeature([SecurityQuestion, User])],
  controllers: [SecurityQuestionsController],
  providers: [SecurityQuestionsService],
  exports: [SecurityQuestionsService],
})
export class SecurityQuestionsModule {}
