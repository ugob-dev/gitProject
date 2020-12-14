
import { Request, Response,Router} from "express";
import { success } from "../helper/Reponse";
import * as jwt from 'jsonwebtoken'
import { getRepository } from "typeorm";
import { Users } from "../entity/User";
require('../config/passport')
require("dotenv").config();
const passport = require('passport')

const router = Router()

router.post('/signin', (
  req: Request,
  res: Response,
  next,
) => {
  passport.authenticate('local', (error, user) => {
    if (error || !user) {
      return res
        .status(404)
        .json({ error })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY )
    console.log("token:",token)
    console.log(success(user,{ token }))
    res.json(success(user,{ token }))
  })(req, res, next)
})

router.post("/signup", async (
  req: Request,
  res: Response,
  next
) => {
  console.log(req.body)
  const newUser = await getRepository(Users).create(req.body);
  await getRepository(Users).save(newUser);
  passport.authenticate('local', (error, user) => {
    if (error || !user) {
      return res
        .status(404)
        .json({ error })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY )
    res.json(success(user,{ token }))
  })(req, res, next)
});

router.post("/forgot-password", async(
  req:Request,
  res:Response,
  next
) =>{
  const user = await getRepository(Users).findOne({ where: { username : req.body.username } });
  if (user) {
    getRepository(Users).merge(user, req.body.password);
    const results = await getRepository(Users).save(user);
    res.json(results);
  }
  res.json({msg: 'Not user found'});

});

export default router
/* STRUCTURE RESPONSE :

{ data:
   { users:
      { uuid: 1,
        firstName: 'ugo',
        lastName: 'benzaquin',
        age: 1,
        mail: 'test',
        role: true 
      },
     meta:
      { token:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDc2NzQ1NDJ9.Qpk95JBJ94oeAYg_se6fS8nhpLtmJlJjWwB2x6g2jS8' 
      } 
    } 
}
*/
