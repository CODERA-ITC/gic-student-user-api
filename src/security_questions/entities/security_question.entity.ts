import { BaseEntity } from 'src/database/base.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class SecurityQuestion extends BaseEntity {
    @Column({ type: 'jsonb', nullable: false })
    answers: {
        questionId: string
        answer: string
    }

    @ManyToOne(() => User, user => user.secureQuestions, {
        onDelete: 'CASCADE',
    })
    user: User
}
