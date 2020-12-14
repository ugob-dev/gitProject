import {Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {Users} from './User'

@Entity()
export class Buckets {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    size: number;

    @OneToOne(type => Users,User=>User.uuid ,{onDelete:'CASCADE'})
    @JoinColumn()
    public User: Users;
    
}

// @ManyToOne(type => Link, link => link.id, {onDelete:'CASCADE'})
/*

    @OneToOne(type => PhotoMetadata, metadata => metadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata;
*/
