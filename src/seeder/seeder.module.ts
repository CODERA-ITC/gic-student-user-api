import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from 'src/course/entities/course.entity'
import { Department } from 'src/department/entitites/department.entity'
import { Role } from '../role/entities/role.entity'
import { User } from '../user/entities/user.entity'
import { SeederService } from './seeder.service'

@Module({
  controllers: [],
  providers: [SeederService],
  imports: [TypeOrmModule.forFeature([
    Department,
    User,
    Role,
    Course,
  ])],
})
export class SeederModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}
  async onModuleInit() {
    await this.seederService.seedCourses()
    await this.seederService.seedDepartment()
    await this.seederService.seedRole()
    await this.seederService.seedUser()
    await this.seederService.seedTeachers()
  }
}
