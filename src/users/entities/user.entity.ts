import { Task } from "src/tasks/entities/task.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nombre: string;
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
