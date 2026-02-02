import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { Course } from '../course/entities/course.entity'
import { Department } from '../department/entitites/department.entity'
import { Role } from '../role/entities/role.entity'
import { User } from '../user/entities/user.entity'

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async seedDepartment() {
    const gic = this.departmentRepo.create()
    gic.id = '11111111-1111-1111-1111-111111111111'
    gic.name = 'Department of Information and Communication Engineering'
    gic.code = 'GIC'
    const result = await this.departmentRepo.upsert(gic, { conflictPaths: ['code'] })
    return result
  }

  async seedTeachers() {
    const courses = await this.courseRepo.find()

    const department = await this.departmentRepo.findOneBy({ id: '11111111-1111-1111-1111-111111111111' })
    const teacherRole = await this.roleRepo.findOne({ where: { name: 'TEACHER' } })
    const adminRole = await this.roleRepo.findOne({ where: { name: 'ADMIN' } })
    const hashedPassword = await bcrypt.hash('@password123', 10)

    const result = await this.userRepo.save(
      [
        {
          id: '66666666-6666-6666-6666-666666666666',
          firstName: 'Super',
          lastName: 'Teacher',
          email: 'admin@gic.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: adminRole!,
        },
        {
          id: '77777777-7777-7777-7777-777777777777',
          firstName: 'Heng',
          lastName: 'Rathpisey',
          email: 'rathpisey@gic.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: teacherRole!,
          courses,
        },
        {
          id: '88888888-8888-8888-8888-888888888888',
          firstName: 'Hok',
          lastName: 'Tin',
          email: 'hoktin@gic.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: teacherRole!,
          courses,
        },
        {
          id: '99999999-9999-9999-9999-999999999999',
          firstName: 'Chun',
          lastName: 'Thavorac',
          email: 'thavorac@gic.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: teacherRole!,
          courses,
        },
      ],
    )

    return result
  }

  async seedUser() {
    const department = await this.departmentRepo.findOneBy({ id: '11111111-1111-1111-1111-111111111111' })
    const teacherRole = await this.roleRepo.findOne({ where: { name: 'TEACHER' } })
    const studentRole = await this.roleRepo.findOne({ where: { name: 'STUDENT' } })
    const adminRole = await this.roleRepo.findOne({ where: { name: 'ADMIN' } })
    const hashedPassword = await bcrypt.hash('@password123', 10)

    const users = [
      {
        firstName: 'Sarah',
        lastName: 'Chen',
        skill: ['Frontend Developer'],
        avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        password: hashedPassword,
        department: department!,
        role: studentRole!,
        email: 'sarahchen@gmail.com',
        bio: 'hello i am very sad',
        year: 4,
        generation: 25,
        socialLinks: [
          { name: 'facebook', url: 'https://www.youtube.com/@MuseAsia' },
          { name: 'twitter', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
          { name: 'instagram', url: 'https://www.youtube.com/watch?v=BGn2oo-0Dqc' },
          { name: 'youtube', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
        ],
      },
      {
        firstName: 'Alex',
        lastName: 'Kumar',
        name: 'Alex Kumar',
        avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        password: hashedPassword,
        department: department!,
        role: studentRole!,
        email: 'alexkumar@gmail.com',
        bio: 'hello i am very sad',
        year: 5,
        generation: 25,
        socialLinks: [
          { name: 'facebook', url: 'https://www.youtube.com/@MuseAsia' },
          { name: 'twitter', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
          { name: 'instagram', url: 'https://www.youtube.com/watch?v=BGn2oo-0Dqc' },
          { name: 'youtube', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
        ],
      },
      {
        firstName: 'Maya',
        lastName: 'Rodriguez',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
        password: hashedPassword,
        department: department!,
        role: studentRole!,
        email: 'mayarodri@gmail.com',
        bio: 'Dattebayo UwU',
        year: 4,
        generation: 25,
        socialLinks: [
          { name: 'facebook', url: 'https://www.youtube.com/@MuseAsia' },
          { name: 'twitter', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
          { name: 'instagram', url: 'https://www.youtube.com/watch?v=BGn2oo-0Dqc' },
          { name: 'youtube', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
        ],
      },
      {
        firstName: 'David',
        lastName: 'Park',
        skill: ['DevOps Engineer', 'Terrorist'],
        avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
        password: hashedPassword,
        department: department!,
        role: studentRole!,
        email: 'davidpark@gmail.com',
        bio: 'hello i am very sad',
        year: 4,
        generation: 25,
        socialLinks: [
          { name: 'facebook', url: 'https://www.youtube.com/@MuseAsia' },
          { name: 'twitter', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
          { name: 'instagram', url: 'https://www.youtube.com/watch?v=BGn2oo-0Dqc' },
          { name: 'youtube', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
        ],
      },
      {
        firstName: 'Emma',
        lastName: 'Thompson',
        skill: ['Product Manager'],
        avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
        password: hashedPassword,
        department: department!,
        role: studentRole!,
        email: 'emmat@gmail.com',
        bio: 'hello i am very sad',
        year: 3,
        generation: 24,
        socialLinks: [
          { name: 'facebook', url: 'https://www.youtube.com/@MuseAsia' },
          { name: 'twitter', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
          { name: 'instagram', url: 'https://www.youtube.com/watch?v=BGn2oo-0Dqc' },
          { name: 'youtube', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
        ],
      },
      {
        firstName: 'James',
        lastName: 'Wilson',
        skill: ['Full Stack Developer'],
        avatarUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
        password: hashedPassword,
        department: department!,
        role: studentRole!,
        email: 'jameswilson@yahoo.com',
        bio: 'Ground control to major tom',
        year: 4,
        generation: 24,
        socialLinks: [
          { name: 'facebook', url: 'https://www.youtube.com/@MuseAsia' },
          { name: 'twitter', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
          { name: 'instagram', url: 'https://www.youtube.com/watch?v=BGn2oo-0Dqc' },
          { name: 'youtube', url: 'https://www.youtube.com/watch?v=1XcpQHfTOvs' },
        ],
      },
    ]

    const result = await this.userRepo.save(
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          firstName: 'Saren',
          lastName: 'Sokmeak',
          email: 'sarensokmeak@gmail.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: studentRole!,
          generation: 24,
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          firstName: 'Yem',
          lastName: 'Daro',
          email: 'yemdaro@gmail.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: studentRole!,
          avatarUrl: 'https://images.pexels.com/photos/35802448/pexels-photo-35802448.jpeg',
          generation: 24,
        },
        {
          id: '33333333-3333-3333-3333-333333333333',
          firstName: 'Sovichet',
          lastName: 'Rathanak',
          email: 'admin123@gmail.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: adminRole!,
          generation: 24,
        },
        {
          id: '44444444-4444-4444-4444-444444444444',
          firstName: 'Cool',
          lastName: 'Teacher',
          email: 'teacher123@gmail.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: teacherRole!,
          generation: 24,
        },
        {
          id: '55555555-5555-5555-5555-555555555555',
          firstName: 'Test',
          lastName: 'User',
          email: 'testuser@gmail.com',
          phone: '0123456789',
          password: hashedPassword,
          department: department!,
          role: studentRole!,
          generation: 24,
        },

        ...users,
      ],
    )

    return result
  }

  async seedRole() {
    const result = await this.roleRepo.upsert([
      {
        name: 'ADMIN',
        description: 'Responsible for managing the system',
      },
      {
        name: 'SUPER_TEACHER',
        description: 'Teacher with administrative privileges to manage other teachers',
      },
      {
        name: 'TEACHER',
        description: 'Manage student projects',
      },
      {
        name: 'STUDENT',
        description: 'Create and propose project ideas',
      },
    ], { conflictPaths: ['name'] })

    return result
  }

  async seedCourses() {
    const result = await this.courseRepo.upsert([
      {
        name: 'Cloud Computing',
        code: 'CC',
      },
      {
        name: 'Natural Language Processing',
        code: 'NLP',
      },
      {
        name: 'Image Processing',
        code: 'IMP',
      },
      {
        name: 'Internet Programming',
        code: 'IP',
      },
      {
        name: 'Mobile Development',
        code: 'MOB',
      },
      {
        name: 'Network',
        code: 'N',
      },
      {
        name: 'Artificial Intelligence',
        code: 'AI',
      },
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'COOLEST COURSE EVER',
        code: 'SEEDED',
      },
    ], { conflictPaths: ['code'] })

    return result
  }
}
