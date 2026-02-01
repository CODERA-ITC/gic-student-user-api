import { Exclude } from 'class-transformer'
import { Course } from 'src/course/entities/course.entity'
import { BaseEntity } from 'src/database/base.entity'
import { Department } from 'src/department/entitites/department.entity'
import { Role } from 'src/role/entities/role.entity'
import { SecurityQuestion } from 'src/security_questions/entities/security_question.entity'

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  avatarUrl: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Exclude()
  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  year: number

  @Column({ nullable: true })
  generation: number

  @Column('simple-array', { nullable: true })
  skill: string[]

  @Column({ nullable: true })
  bio: string

  @Column({ type: 'text', nullable: true, select: false })
  refreshToken: string | null

  @Column({ nullable: true })
  studentId: string

  @Column({ type: 'jsonb', nullable: true })
  socialLinks: SocialLink[]

  @ManyToOne(() => Role, role => role.users)
  role: Role

  @OneToMany(() => SecurityQuestion, secureQuestion => secureQuestion.user, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  secureQuestions: SecurityQuestion[]

  @ManyToOne(() => Department, department => department.users)
  department: Department

  @ManyToMany(() => Course, course => course.users)
  @JoinTable()
  courses: Course[]
}

export class SocialLink {
  name: string
  url: string
}
