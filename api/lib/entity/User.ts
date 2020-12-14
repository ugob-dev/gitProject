import {Entity, PrimaryGeneratedColumn, Column,BeforeInsert,BeforeUpdate} from "typeorm";
var bcrypt = require('bcryptjs')

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    uuid: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
    
    @Column()
    mail: string;

    @Column()
    password: string;

    @Column()
    role: boolean;

    @BeforeInsert()
    @BeforeUpdate()

    public hashPassword(): void | never {
      if (!this.password) {
        throw new Error('Password is not defined')
      }
  
      this.password = bcrypt.hashSync(this.password)
    }

    public checkPassword(uncryptedPassword: string): boolean {
      console.log(uncryptedPassword)
      console.log(this.password)
      return bcrypt.compareSync(uncryptedPassword, this.password)
    }
    public toJSON(): Users {
      const json: Users = Object.assign({}, this)
  
      delete json.password
  
      return json
    }
}
