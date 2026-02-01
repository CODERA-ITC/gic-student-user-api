import { BaseEntity } from 'src/database/base.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity()
export class Department extends BaseEntity {
  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  code: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => User, user => user.department)
  users: User[]
}
