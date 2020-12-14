import {Entity, PrimaryGeneratedColumn, Column,OneToOne,JoinColumn} from "typeorm";
import {Buckets} from './Bucket'

@Entity()
export class Blobs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    size: number;

    @Column()
    publicLink: string;

    @OneToOne(type => Buckets,Bucket => Bucket.id,{onDelete:'CASCADE'})
    @JoinColumn()
    public Bucket : Buckets;
}

// @ManyToOne(type => Link, link => link.id, {onDelete:'CASCADE'})