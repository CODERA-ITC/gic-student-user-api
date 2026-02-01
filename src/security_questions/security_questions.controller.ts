import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { MultiSecurityQuestionDto } from './dto/answer.dto'
import { SecurityQuestionsService } from './security_questions.service'

@Controller('security-questions')
export class SecurityQuestionsController {
  constructor(private readonly securityQuestionsService: SecurityQuestionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all security questions' })
  findAll() {
    return this.securityQuestionsService.findAllSQ()
  }

  @Post('answer')
  @UseGuards(JwtAuthGuard)
  answer(
    @CurrentUser() user: { id: string },
    @Body() dto: MultiSecurityQuestionDto,
  ) {
    return this.securityQuestionsService.saveMutliAnswer(user.id, dto)
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verify security question answers for password change' })
  verifyAuthenticated(
    @CurrentUser() user: { id: string },
    @Body() dto: MultiSecurityQuestionDto,
  ) {
    return this.securityQuestionsService.verifyMultiAnswer(dto, user.id)
  }

  @Post('verify/public')
  @ApiOperation({ summary: 'Verify security question answers for password change' })
  async verifyPublic(@Body() dto: MultiSecurityQuestionDto) {
    return this.securityQuestionsService.verifyMultiAnswer(dto)
  }
}
