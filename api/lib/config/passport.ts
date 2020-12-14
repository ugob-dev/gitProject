
import { Users } from '../entity/User';
import {getRepository} from 'typeorm'
var LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();
// var jwtStrategy = require('passport-jwt').Strategy

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

export var passport = require('passport');

//local
passport.use(new LocalStrategy(
    {
        usernameField : 'mail',
        passwordFied : 'password'
    },
    async (mail, password, done) => {
        try {
            const user = await getRepository(Users).findOne({mail})
            if(!user){
                done(`Sorry username ${mail} dosen't exist`, null)
            }
            if (!user.checkPassword(password)) {
                done(`Sorry password is incorrect`, null)
                return
            }
            done(null,user)
        } catch (err) {
            done(err.message)
        }
    }
    )
);

//jwt


passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    },
    async (
      user: { id: number },
      done,
    )  => {
      const userById = await getRepository(Users).findOne({ where: { uuid : user.id } })
      if (!userById) {
        done('Wrong API Token', null)
      } else {
        done(null, user)
      }
    }
  )
)



// passport.use(new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET_KEY as string,
//     },
//     async (jwtPayload, done) => {
//         try {
//           console.log(jwtPayload)
//           console.log(jwtPayload.sub.id)
//           const { id } = jwtPayload.id
//           const user = await getRepository(Users).findOne({ where: { uuid : id } })
//           if (!user) {
//             done(`User ${id} doesn't exist`)
//             return
//           }
  
//           done(null, user)
//         } catch (err) {
//           done(err.message)
//         }
//       }
// ))

